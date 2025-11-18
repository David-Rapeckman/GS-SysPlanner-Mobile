// src/components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PlannerTask } from '../types/planner';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface TaskItemProps {
  task: PlannerTask;
  onPress?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress }) => {
  let statusColor = colors.danger;

  switch (task.status) {
    case 'open':
      statusColor = colors.primaryMedium;
      break;
    case 'in_progress':
      statusColor = colors.primary;
      break;
    case 'pending':
      statusColor = colors.danger;
      break;
    case 'completed':
    case 'done': // caso algum registro antigo ainda use "done"
      statusColor = colors.success; // VERDE
      break;
    default:
      statusColor = colors.danger;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.touchable}
    >
      <View style={styles.container}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.subtitle}>
            {task.date}
            {task.time ? ` • ${task.time}` : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8, // espaçamento entre os cards
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
});

export default TaskItem;
