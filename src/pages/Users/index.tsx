import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';
import { Ionicons } from '@expo/vector-icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState({});
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      // @ts-ignore
      const usersData = [];
      usersSnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      // @ts-ignore

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // @ts-ignore

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // @ts-ignore

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
    setNewPassword('');
    setConfirmPassword('');
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      // @ts-ignore

      await updateDoc(doc(db, 'users', editingUser.id), {
        username: editedUsername,
        email: editedEmail,
        password: newPassword,
        confirmPassword: confirmPassword,
      });


      setEditingUser({});
      fetchUsers();
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  // @ts-ignore

  const renderItem = ({ item }) => (
    <View style={styles.userRow}>
      <Text style={styles.userInfo}>Nome: {item.username}</Text>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
      <Text style={styles.userInfo}>Senha: {item.password}</Text>
      <Text style={styles.userInfo}>Confirmação de Senha: {item.confirmPassword}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <Ionicons name="trash-bin" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenEditDialog(item)}>
          <Ionicons name="create" size={24} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Cozinheiros</Text>
      <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id} />

      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.editModal}>
          <Text style={styles.modalHeader}>Editar Usuário</Text>
          <TextInput
            style={styles.editInput}
            value={editedUsername}
            onChangeText={setEditedUsername}
            placeholder="Novo Nome"
          />
          <TextInput
            style={styles.editInput}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Novo Email"
          />
          <TextInput
            style={styles.editInput}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Nova Senha"
          />
          <TextInput
            style={styles.editInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirmar Nova Senha"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <View style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveEdit}>
              <View style={styles.saveButton}>
                <Text style={styles.buttonText}>Salvar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userRow: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  icon: {
    marginLeft: 16,
  },
  editModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '80%',
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Users;
