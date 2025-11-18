// src/screens/Home/LocationScreen.tsx
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
    title: 'Estudar Java Advanced – GS',
    date: '2025-11-18',
    time: '19:00',
    status: 'open',
    category: 'Estudos',
  },
  {
    id: '2',
    title: 'Rever pipeline de DevOps',
    date: '2025-11-18',
    time: '21:00',
    status: 'in_progress',
    category: 'DevOps',
  },
  {
    id: '3',
    title: 'Treino de Crossfit',
    date: '2025-11-18',
    time: '17:00',
    status: 'completed',
    category: 'Saúde',
  },
];

type EditableCardKey = 'today' | 'completed';
type TaskStatusType = 'open' | 'in_progress' | 'pending' | 'completed';

// flag para NÃO renderizar os cards de Today / Completed
const SHOW_SUMMARY_CARDS = false;

const LocationScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // ---------- STATE DOS CARDS SUPERIORES ----------
  const [cardDescriptions, setCardDescriptions] = useState<{
    today: string;
    completed: string;
  }>({
    today: 'Tarefas agendadas para hoje',
    completed: 'Tarefas finalizadas',
  });

  const [editingKey, setEditingKey] = useState<EditableCardKey | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  // ---------- STATE DAS TASKS ----------
  const [tasks, setTasks] = useState<PlannerTask[]>(INITIAL_TASKS);

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);
  const [tempTaskTitle, setTempTaskTitle] = useState('');
  const [tempTaskDate, setTempTaskDate] = useState('');
  const [tempTaskTime, setTempTaskTime] = useState('');
  const [tempTaskStatus, setTempTaskStatus] =
    useState<TaskStatusType>('open');
  const [taskError, setTaskError] = useState<string | null>(null);

  const total = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const openCount = tasks.filter(t => t.status === 'open').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;

  const HOME_BACKGROUND = colors.background;

  const today = new Date();
  const todayLabel = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const maxForBars = Math.max(
    openCount,
    inProgressCount,
    pendingCount,
    completedCount,
    1,
  );

  function getBarWidth(value: number) {
    const percent = (value / maxForBars) * 100;
    return `${percent}%`;
  }

  // ---------- MODAL DOS CARDS ----------
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

  // ---------- MODAL DAS TASKS ----------
  function openTaskModal(task?: PlannerTask) {
    if (task) {
      setEditingTask(task);
      setTempTaskTitle(task.title);
      setTempTaskDate(task.date);
      setTempTaskTime(task.time ?? '');
      setTempTaskStatus(
        (task.status as TaskStatusType) || 'open',
      );
    } else {
      setEditingTask(null);
      setTempTaskTitle('');
      setTempTaskDate('');
      setTempTaskTime('');
      setTempTaskStatus('open');
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
    setTempTaskStatus('open');
    setTaskError(null);
  }

  function handleSaveTask() {
    const title = tempTaskTitle.trim();
    const date = tempTaskDate.trim();
    const time = tempTaskTime.trim();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const timeRegex = /^\d{2}:\d{2}$/;       // HH:MM

    if (!title || !date || !time) {
      setTaskError('Preencha título, data e horário.');
      return;
    }

    if (!dateRegex.test(date)) {
      setTaskError('A data deve estar no formato AAAA-MM-DD.');
      return;
    }

    if (!timeRegex.test(time)) {
      setTaskError('O horário deve estar no formato HH:MM.');
      return;
    }

    const [h, m] = time.split(':').map(Number);
    if (h < 0 || h > 23 || m < 0 || m > 59) {
      setTaskError('Informe um horário válido (00:00–23:59).');
      return;
    }

    setTaskError(null);

    if (editingTask) {
      // edição
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id
            ? { ...t, title, date, time, status: tempTaskStatus }
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
        status: tempTaskStatus,
        category: 'Geral',
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
        t.id === editingTask.id ? { ...t, status: 'completed' } : t,
      ),
    );
    closeTaskModal();
  }

  return (
    <View style={[styles.container, { backgroundColor: HOME_BACKGROUND }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- CABEÇALHO + HERO ---------- */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.mainTitle}>Organize seu dia com o SysPlanner</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>SP</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroDate}>{todayLabel}</Text>
            <Text style={styles.heroTitle}>Visão geral do seu dia</Text>
            <Text style={styles.heroSubtitle}>
              Acompanhe estudos, trabalho e treinos em um só lugar.
            </Text>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroStatBox}>
              <Text style={styles.heroStatLabel}>Tarefas</Text>
              <Text style={styles.heroStatValue}>{total}</Text>
            </View>
            <View style={styles.heroStatBox}>
              <Text style={styles.heroStatLabel}>Concluídas</Text>
              <Text style={styles.heroStatValue}>{completedCount}</Text>
            </View>
          </View>
        </View>

        {/* ---------- DASHBOARD ---------- */}
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardTitle}>Resumo das tarefas</Text>
          <Text style={styles.dashboardSubtitle}>
            Distribuição das tarefas do seu planner.
          </Text>

          <View style={styles.dashboardRow}>
            <Text style={styles.dashboardLabel}>Abertas</Text>
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
            <Text style={styles.dashboardLabel}>Em andamento</Text>
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
            <Text style={styles.dashboardLabel}>Pendentes</Text>
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
            <Text style={styles.dashboardLabel}>Concluídas</Text>
            <View style={styles.dashboardBarBackground}>
              <View
                style={[
                  styles.dashboardBarFillDone,
                  { width: getBarWidth(completedCount) },
                ]}
              />
            </View>
            <Text style={styles.dashboardValue}>{completedCount}</Text>
          </View>
        </View>

        {/* ---------- CARDS RESUMO (OCULTOS VISUALMENTE) ---------- */}
        {SHOW_SUMMARY_CARDS && (
          <View style={styles.cardsRow}>
            <PlannerCard
              label="Hoje"
              value={total}
              subtitle={cardDescriptions.today}
              highlight
              onPress={() => openEditCardModal('today')}
            />
            <PlannerCard
              label="Concluídas"
              value={completedCount}
              subtitle={cardDescriptions.completed}
              variant="ghost"
              onPress={() => openEditCardModal('completed')}
            />
          </View>
        )}

        {/* ---------- LISTA DE TASKS ---------- */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Tarefas de hoje</Text>
            <Text style={styles.sectionSubtitle}>
              Foque no que realmente importa agora.
            </Text>
          </View>

          <View style={styles.tag}>
            <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
            <Text style={styles.tagText}>{total} tarefas</Text>
          </View>
        </View>

        <View style={styles.tasksCard}>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color={colors.primary}
              />
              <Text style={styles.emptyTitle}>Nenhuma tarefa para hoje 🎉</Text>
              <Text style={styles.emptySubtitle}>
                Crie uma nova tarefa e comece a planejar seu dia.
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

      {/* ---------- BOTÃO FLUTUANTE ---------- */}
      <TouchableOpacity style={styles.fab} onPress={() => openTaskModal()}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* ---------- MODAL: TEXTO DOS CARDS (CASO USE NO FUTURO) ---------- */}
      <Modal
        visible={isCardModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCardModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar descrição do card</Text>
            <Text style={styles.modalSubtitle}>
              Altere o texto que aparece abaixo do valor do card.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={tempDescription}
              onChangeText={setTempDescription}
              placeholder="Digite uma nova descrição"
              placeholderTextColor={colors.textMuted}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonOutline]}
                onPress={closeCardModal}
              >
                <Text style={styles.modalButtonOutlineText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleSaveCardDescription}
              >
                <Text style={styles.modalButtonPrimaryText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ---------- MODAL: CRIAR / EDITAR TASK ---------- */}
      <Modal
        visible={taskModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeTaskModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingTask ? 'Editar tarefa' : 'Nova tarefa'}
            </Text>
            <Text style={styles.modalSubtitle}>
              Preencha as informações da tarefa.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={tempTaskTitle}
              onChangeText={setTempTaskTitle}
              placeholder="Título (ex: Estudar Java Advanced – GS)"
              placeholderTextColor={colors.textMuted}
            />

            <TextInput
              style={styles.modalInput}
              value={tempTaskDate}
              onChangeText={setTempTaskDate}
              placeholder="Data (AAAA-MM-DD)"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.modalInput}
              value={tempTaskTime}
              onChangeText={setTempTaskTime}
              placeholder="Horário (HH:MM)"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
            />

            {/* STATUS */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status</Text>
              <View style={styles.statusChipsRow}>
                {(
                  [
                    { key: 'open', label: 'Aberta' },
                    { key: 'in_progress', label: 'Em andamento' },
                    { key: 'pending', label: 'Pendente' },
                    { key: 'completed', label: 'Concluída' },
                  ] as { key: TaskStatusType; label: string }[]
                ).map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.statusChip,
                      tempTaskStatus === option.key &&
                        styles.statusChipActive,
                    ]}
                    onPress={() => setTempTaskStatus(option.key)}
                  >
                    <Text
                      style={[
                        styles.statusChipText,
                        tempTaskStatus === option.key &&
                          styles.statusChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

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
                  <Text style={styles.modalDeleteButtonText}>Excluir</Text>
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
                      Marcar como concluída
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonOutline]}
                  onPress={closeTaskModal}
                >
                  <Text style={styles.modalButtonOutlineText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonPrimary]}
                  onPress={handleSaveTask}
                >
                  <Text style={styles.modalButtonPrimaryText}>Salvar</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.lg,
    color: colors.text,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primaryMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.sm,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingMd,
    marginBottom: 16,
  },
  heroDate: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: '#DCEBFF',
  },
  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.lg,
    color: '#FFFFFF',
    marginTop: 4,
  },
  heroSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: '#E0ECFF',
    marginTop: 4,
  },
  heroStats: {
    marginLeft: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  heroStatBox: {
    backgroundColor: '#1B6DD0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  heroStatLabel: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: '#E5F0FF',
  },
  heroStatValue: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.md,
    color: '#FFFFFF',
  },
  dashboardCard: {
    backgroundColor: colors.surface,
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingMd,
    marginBottom: 16,
  },
  dashboardTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: colors.text,
  },
  dashboardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 8,
  },
  dashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dashboardLabel: {
    width: 100,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.text,
  },
  dashboardBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.backgroundSoft,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  dashboardBarFillOpen: {
    height: '100%',
    backgroundColor: colors.primaryMedium,
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
    color: colors.text,
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
    color: colors.text,
  },
  sectionSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    marginLeft: 4,
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.xs,
    color: colors.text,
  },
  tasksCard: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusLg,
    paddingHorizontal: metrics.paddingMd,
    paddingVertical: metrics.paddingSm,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  // ---------- MODAIS ----------
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.backgroundSoft,
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
    backgroundColor: colors.background,
    color: colors.text,
  },
  statusContainer: {
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.xs,
    color: colors.text,
    marginBottom: 6,
  },
  statusChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  statusChipActive: {
    backgroundColor: colors.primaryMedium,
    borderColor: colors.primaryMedium,
  },
  statusChipText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  statusChipTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.medium,
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
    backgroundColor: 'transparent',
  },
  modalButtonOutlineText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
  },
  modalButtonOutlineSecondary: {
    borderWidth: 1,
    borderColor: colors.success,
    backgroundColor: 'transparent',
  },
  modalButtonOutlineSecondaryText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.success,
  },
  modalButtonPrimary: {
    backgroundColor: colors.primaryMedium,
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
