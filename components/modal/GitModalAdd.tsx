import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface GitModalAddProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  repoId: string;
  ownerId: string;
  setRepoId: (value: string) => void;
  setOwnerId: (value: string) => void;
}

export function GitModalAdd({
  visible,
  onClose,
  onSave,
  repoId,
  ownerId,
  setRepoId,
  setOwnerId
}: GitModalAddProps) {
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
            New git api data
          </Text>

          <TextInput
            placeholder="Owner Id"
            value={ownerId}
            onChangeText={setOwnerId}
            style={style.input}
          />
          <TextInput
            placeholder="Repo Id"
            value={repoId}
            onChangeText={setRepoId}
            style={style.input}
          />

          <View style={style.modalButtons}>
            <TouchableOpacity onPress={onClose} style={style.cancelButton}>
              <Text style={style.cancelTextCreate}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSave}>
              <Text style={style.saveText}>Save</Text>
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
        justifyContent: 'flex-end',
        marginTop: 10,
      },
      cancelButton: {
        marginRight: 15,
      },
      cancelTextCreate:{
        color: "#EF4444",
        fontWeight: "600",
      },
      cancelTextEdit: {
        color: 'grey',
        fontWeight: '600',
      },
      saveText: {
        color: '#2563EB',
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