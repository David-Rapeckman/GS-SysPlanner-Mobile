import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlannerCard from '../../components/PlannerCard';
import TaskItem from '../../components/TaskItem';
import { PlannerTask } from '../../types/planner';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_TASKS: PlannerTask[] = [
  {
    id: '1',
    title: 'Study Java Advanced – GS',
    date: '2025-11-18',
    time: '19:00',
    status: 'pending',
    category: 'Study',
  },
  {
    id: '2',
    title: 'Review DevOps pipeline',
    date: '2025-11-18',
    time: '21:00',
    status: 'in_progress',
    category: 'DevOps',
  },
  {
    id: '3',
    title: 'Crossfit training',
    date: '2025-11-18',
    time: '17:00',
    status: 'done',
    category: 'Health',
  },
];

type EditableCardKey = 'today' | 'completed';

const LocationScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // ---- cards de topo ----
  const [cardDescriptions, setCardDescriptions] = useState<{
    today: string;
    completed: string;
  }>({
    today: 'Tasks',
    completed: 'Today',
  });

  const [editingKey, setEditingKey] = useState<EditableCardKey | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  // ---- tasks ----
  const [tasks, setTasks] = useState<PlannerTask[]>(INITIAL_TASKS);

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);
  const [tempTaskTitle, setTempTaskTitle] = useState('');
  const [tempTaskDate, setTempTaskDate] = useState('');
  const [tempTaskTime, setTempTaskTime] = useState('');
  const [taskError, setTaskError] = useState<string | null>(null);

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const openCount = tasks.filter(t => t.status !== 'done').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;

  const BACKGROUND = '#4A769E';

  const maxForBars = Math.max(openCount, done, total, 1);

  function getBarWidth(value: number) {
    const percent = (value / maxForBars) * 100;
    return `${percent}%`;
  }

  // ----- modal dos CARDS -----
  function openEditCardModal(key: EditableCardKey) {
    setEditingKey(key);
    setTempDescription(cardDescriptions[key]);
  }

  function closeCardModal() {
    setEditingKey(null);
    setTempDescription('');
  }

  function handleSaveCardDescription() {
    if (!editingKey) return;
    setCardDescriptions(prev => ({
      ...prev,
      [editingKey]: tempDescription.trim() || prev[editingKey],
    }));
    closeCardModal();
  }

  const isCardModalVisible = editingKey !== null;

  // ----- modal das TASKS -----
  function openTaskModal(task?: PlannerTask) {
    if (task) {
      setEditingTask(task);
      setTempTaskTitle(task.title);
      setTempTaskDate(task.date);
      setTempTaskTime(task.time ?? '');
    } else {
      setEditingTask(null);
      setTempTaskTitle('');
      setTempTaskDate('');
      setTempTaskTime('');
    }
    setTaskError(null);
    setTaskModalVisible(true);
  }

  function closeTaskModal() {
    setTaskModalVisible(false);
    setEditingTask(null);
    setTempTaskTitle('');
    setTempTaskDate('');
    setTempTaskTime('');
    setTaskError(null);
  }

  function handleSaveTask() {
    const title = tempTaskTitle.trim();
    const date = tempTaskDate.trim();
    const time = tempTaskTime.trim();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const timeRegex = /^\d{2}:\d{2}$/; // HH:MM

    if (!title || !date || !time) {
      setTaskError('Please fill in title, date and time.');
      return;
    }

    if (!dateRegex.test(date)) {
      setTaskError('Date must be in the format YYYY-MM-DD.');
      return;
    }

    if (!timeRegex.test(time)) {
      setTaskError('Time must be in the format HH:MM.');
      return;
    }

    const [h, m] = time.split(':').map(Number);
    if (h < 0 || h > 23 || m < 0 || m > 59) {
      setTaskError('Time must be a valid hour (00:00–23:59).');
      return;
    }

    setTaskError(null);

    if (editingTask) {
      // edição
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id
            ? {
                ...t,
                title,
                date,
                time,
              }
            : t,
        ),
      );
    } else {
      // criação
      const newTask: PlannerTask = {
        id: Date.now().toString(),
        title,
        date,
        time,
        status: 'pending',
        category: 'General',
      };
      setTasks(prev => [...prev, newTask]);
    }

    closeTaskModal();
  }

  function handleDeleteTask() {
    if (!editingTask) return;
    setTasks(prev => prev.filter(t => t.id !== editingTask.id));
    closeTaskModal();
  }

  function handleMarkTaskDone() {
    if (!editingTask) return;
    setTasks(prev =>
      prev.map(t =>
        t.id === editingTask.id ? { ...t, status: 'done' } : t,
      ),
    );
    closeTaskModal();
  }

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.title}>Here is your day at a glance 👀</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>SP</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* DASHBOARD / GRAFICOS SIMPLES */}
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardTitle}>Overview</Text>
          <Text style={styles.dashboardSubtitle}>
            Task distribution for your planner.
          </Text>

          <View style={styles.dashboardRow}>
            <Text style={styles.dashboardLabel}>Open</Text>
            <View style={styles.dashboardBarBackground}>
              <View
                style={[
                  styles.dashboardBarFillOpen,
                  { width: getBarWidth(openCount) },
                ]}
              />
            </View>
            <Text style={styles.dashboardValue}>{openCount}</Text>
          </View>

          <View style={styles.dashboardRow}>
            <Text style={styles.dashboardLabel}>In progress</Text>
            <View style={styles.dashboardBarBackground}>
              <View
                style={[
                  styles.dashboardBarFillInProgress,
                  { width: getBarWidth(inProgressCount) },
                ]}
              />
            </View>
            <Text style={styles.dashboardValue}>{inProgressCount}</Text>
          </View>

          <View style={styles.dashboardRow}>
            <Text style={styles.dashboardLabel}>Pending</Text>
            <View style={styles.dashboardBarBackground}>
              <View
                style={[
                  styles.dashboardBarFillPending,
                  { width: getBarWidth(pendingCount) },
                ]}
              />
            </View>
            <Text style={styles.dashboardValue}>{pendingCount}</Text>
          </View>

          <View style={styles.dashboardRow}>
            <Text style={styles.dashboardLabel}>Completed</Text>
            <View style={styles.dashboardBarBackground}>
              <View
                style={[
                  styles.dashboardBarFillDone,
                  { width: getBarWidth(done) },
                ]}
              />
            </View>
            <Text style={styles.dashboardValue}>{done}</Text>
          </View>
        </View>

        {/* CARDS DE RESUMO */}
        <View style={styles.cardsRow}>
          <PlannerCard
            label="Today"
            value={total}
            subtitle={cardDescriptions.today}
            highlight
            onPress={() => openEditCardModal('today')}
          />
          <PlannerCard
            label="Completed"
            value={done}
            subtitle={cardDescriptions.completed}
            variant="ghost"
            onPress={() => openEditCardModal('completed')}
          />
        </View>

        {/* SEÇÃO TAREFAS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Today’s tasks</Text>
            <Text style={styles.sectionSubtitle}>
              Keep your focus on what matters today.
            </Text>
          </View>

          <View style={styles.tag}>
            <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
            <Text style={styles.tagText}>{total} tasks</Text>
          </View>
        </View>

        {/* LISTA EM CARD BRANCO */}
        <View style={styles.tasksCard}>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color={colors.primary}
              />
              <Text style={styles.emptyTitle}>No tasks for today 🎉</Text>
              <Text style={styles.emptySubtitle}>
                Create a new task and start planning your next move.
              </Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TaskItem task={item} onPress={() => openTaskModal(item)} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => openTaskModal()}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* MODAL DE EDIÇÃO DOS CARDS */}
      <Modal
        visible={isCardModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCardModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit card description</Text>
            <Text style={styles.modalSubtitle}>
              Change the subtitle text that appears under the card value.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={tempDescription}
              onChangeText={setTempDescription}
              placeholder="Type a new description"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonOutline]}
                onPress={closeCardModal}
              >
                <Text style={styles.modalButtonOutlineText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleSaveCardDescription}
              >
                <Text style={styles.modalButtonPrimaryText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DE EDIÇÃO / CRIAÇÃO DE TASK */}
      <Modal
        visible={taskModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeTaskModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingTask ? 'Edit task' : 'New task'}
            </Text>
            <Text style={styles.modalSubtitle}>
              Fill in the information for this task.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={tempTaskTitle}
              onChangeText={setTempTaskTitle}
              placeholder="Title (ex: Study Java Advanced – GS)"
            />

            <TextInput
              style={styles.modalInput}
              value={tempTaskDate}
              onChangeText={setTempTaskDate}
              placeholder="Date (YYYY-MM-DD)"
              keyboardType="numeric"
            />

            <TextInput
              style={styles.modalInput}
              value={tempTaskTime}
              onChangeText={setTempTaskTime}
              placeholder="Time (HH:MM)"
              keyboardType="numeric"
            />

            {taskError ? (
              <Text style={styles.errorText}>{taskError}</Text>
            ) : null}

            <View style={styles.modalButtonsRow}>
              {editingTask && (
                <TouchableOpacity
                  style={[styles.modalSmallButton, styles.modalDeleteButton]}
                  onPress={handleDeleteTask}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.modalDeleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}

              <View style={styles.modalButtons}>
                {editingTask && (
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.modalButtonOutlineSecondary,
                    ]}
                    onPress={handleMarkTaskDone}
                  >
                    <Text style={styles.modalButtonOutlineSecondaryText}>
                      Mark as done
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonOutline]}
                  onPress={closeTaskModal}
                >
                  <Text style={styles.modalButtonOutlineText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonPrimary]}
                  onPress={handleSaveTask}
                >
                  <Text style={styles.modalButtonPrimaryText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: metrics.paddingMd,
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: '#D9E6F2',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: '#FFFFFF',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF33',
    borderWidth: 1,
    borderColor: '#FFFFFF66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.sm,
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF22',
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingMd,
    marginBottom: 16,
  },
  dashboardTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: '#FFFFFF',
  },
  dashboardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: '#E2ECF7',
    marginTop: 2,
    marginBottom: 8,
  },
  dashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dashboardLabel: {
    width: 90,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: '#F1F5F9',
  },
  dashboardBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#0F172A33',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  dashboardBarFillOpen: {
    height: '100%',
    backgroundColor: colors.warning,
    borderRadius: 999,
  },
  dashboardBarFillInProgress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  dashboardBarFillPending: {
    height: '100%',
    backgroundColor: colors.danger,
    borderRadius: 999,
  },
  dashboardBarFillDone: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 999,
  },
  dashboardValue: {
    width: 30,
    textAlign: 'right',
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.xs,
    color: '#FFFFFF',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: metrics.paddingSm,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.lg,
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: '#E2ECF7',
    marginTop: 2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF33',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    marginLeft: 4,
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.xs,
    color: '#FFFFFF',
  },
  tasksCard: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusLg,
    paddingHorizontal: metrics.paddingMd,
    paddingVertical: metrics.paddingSm,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: colors.text,
    marginTop: 8,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  // ---- modal (reaproveitado) ----
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.lg,
    color: colors.text,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginBottom: 16,
  },
  modalInput: {
    height: 44,
    borderRadius: metrics.radiusMd,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: metrics.paddingMd,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.danger,
    marginBottom: 8,
  },
  modalButtonsRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalButton: {
    minWidth: 90,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  modalButtonOutline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  modalButtonOutlineText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
  },
  modalButtonOutlineSecondary: {
    borderWidth: 1,
    borderColor: colors.success,
    backgroundColor: '#ECFDF3',
  },
  modalButtonOutlineSecondaryText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.success,
  },
  modalButtonPrimary: {
    backgroundColor: colors.primary,
  },
  modalButtonPrimaryText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: '#FFFFFF',
  },
  modalSmallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 999,
  },
  modalDeleteButton: {
    backgroundColor: colors.danger,
  },
  modalDeleteButtonText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: '#FFFFFF',
  },
});

export default LocationScreen;
