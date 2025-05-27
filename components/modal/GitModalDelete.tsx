import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GitModalDeleteProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function GitModalDelete({
  visible,
  onClose,
  onDelete
}: GitModalDeleteProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>
            This action will delete all data, are you sure you want to delete it?
          </Text>

          <View style={style.modalButtons}>
            <TouchableOpacity onPress={onClose} style={style.cancelButton}>
              <Text style={style.cancelTextCreate}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
              <Text style={style.saveText}>Delete</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
}


const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        width: '85%',
        borderRadius: 12,
        alignItems:'center'
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      input: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      cancelButton: {
        marginRight: 15,
      },
      cancelTextCreate:{
        color: "#414141",
        fontWeight: "600",
      },
      cancelTextEdit: {
        color: 'grey',
        fontWeight: '600',
      },
      saveText: {
        color: 'red',
        fontWeight: '600',
      },
      deleteButton: {
        marginRight: 15,
      },
      deleteText: {
        color: "#EF4444",
        fontWeight: "600",
      },
      
}) 