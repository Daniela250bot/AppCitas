import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchablePicker = ({
  data,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder = "Buscar...",
  displayKey = 'label',
  valueKey = 'value',
  loading = false,
  error = null,
  style
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredData(data || []);
    } else {
      const filtered = (data || []).filter(item =>
        item[displayKey]?.toLowerCase().includes(searchText.toLowerCase()) ||
        item[valueKey]?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchText, data, displayKey, valueKey]);

  const selectedItem = data?.find(item => item[valueKey] === value);

  const handleSelect = (item) => {
    onValueChange(item[valueKey]);
    setModalVisible(false);
    setSearchText('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.itemText}>{item[displayKey]}</Text>
      {item[valueKey] === value && (
        <Ionicons name="checkmark" size={20} color="#10B981" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
        disabled={loading}
      >
        <Text style={[styles.pickerText, !selectedItem && styles.placeholderText]}>
          {selectedItem ? selectedItem[displayKey] : placeholder}
        </Text>
        <Ionicons
          name={loading ? "hourglass" : "chevron-down"}
          size={20}
          color="#6B7280"
        />
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {loading ? (
              <View style={styles.loadingContainer}>
                <Ionicons name="hourglass" size={24} color="#10B981" />
                <Text style={styles.loadingText}>Cargando...</Text>
              </View>
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item[valueKey]?.toString()}
                renderItem={renderItem}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {searchText ? 'No se encontraron resultados' : 'No hay datos disponibles'}
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  pickerButton: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  pickerText: {
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '70%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#064E3B',
  },
  closeButton: {
    padding: 5,
  },
  searchInput: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 15,
    fontSize: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },
  list: {
    maxHeight: 300,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemText: {
    fontSize: 16,
    color: "#111827",
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
});

export default SearchablePicker;