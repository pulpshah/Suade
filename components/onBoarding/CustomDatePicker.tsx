import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ViewStyle,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
  value?: Date;
  containerStyle?: ViewStyle;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateChange,
  value,
  containerStyle
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [displayValue, setDisplayValue] = useState(
    value ? value.toLocaleDateString() : 'Date of birth...'
  );

  const generateCalendarDays = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDayPress = (day: number) => {
    const newDate = new Date(selectedDate.setDate(day));
    setSelectedDate(newDate);
    setDisplayValue(newDate.toLocaleDateString());
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <>
      <TouchableOpacity
        style={[styles.input, containerStyle]} // Merge default and custom styles
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.inputText}>{displayValue}</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <Text style={styles.headerButton}>{'<'}</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.headerButton}>{'>'}</Text>
              </TouchableOpacity>
            </View>

            {/* Selected Date Display */}
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateText}>
                {selectedDate.toLocaleDateString()}
              </Text>
              <TouchableOpacity style={styles.todayButton}>
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar */}
            <View style={styles.calendar}>
              {/* Weekday headers */}
              <View style={styles.weekDays}>
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                  <Text key={day} style={styles.weekDayText}>{day}</Text>
                ))}
              </View>

              {/* Calendar grid */}
              <View style={styles.daysGrid}>
                {generateCalendarDays(selectedDate).map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayButton,
                      day === selectedDate.getDate() && styles.selectedDayButton
                    ]}
                    onPress={() => day && handleDayPress(day)}
                  >
                    <Text style={[
                      styles.dayText,
                      day === selectedDate.getDate() && styles.selectedDayText
                    ]}>
                      {day || ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => {
                  onDateChange(selectedDate);
                  setIsVisible(false);
                }}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  inputText: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    fontSize: 18,
    color: '#6B7280',
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#000',
  },
  todayButton: {
    padding: 8,
  },
  todayButtonText: {
    color: '#6366f1',
    fontWeight: '500',
  },
  calendar: {
    marginBottom: 16,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    color: '#6B7280',
    width: 35,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: SCREEN_WIDTH * 0.9 / 7 - 8,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  selectedDayButton: {
    backgroundColor: '#6366f1',
    borderRadius: 17.5,
  },
  dayText: {
    color: '#000',
  },
  selectedDayText: {
    color: '#FFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    padding: 12,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#6B7280',
  },
  applyButton: {
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
});