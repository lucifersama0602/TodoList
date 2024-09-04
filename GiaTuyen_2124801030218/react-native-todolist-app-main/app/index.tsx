import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function todoListApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  function notification(message: string) {
    setNotificationMessage(message);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  }

  function addTask() {
    if (task.trim().length > 0) {
      setTasks([
        ...tasks,
        {
          id: Math.random().toString(36).substring(7),
          title: task,
          completed: false,
        },
      ]);
      setTask("");
      notification("Task added successfully");
    } else {
      notification("Task title can't be empty");
    }
  }

  function confirmDeleteTask(id: string) {
    setTaskToDelete(id);
    setConfirmDeleteVisible(true);
  }

  function deleteTask() {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
      setConfirmDeleteVisible(false);
      notification("Task deleted successfully");
    }
  }

  function toggleComplete(id: string) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    const completedTask: Task | undefined = tasks.find(
      (item) => item.id === id
    );
    if (completedTask) {
      notification(
        completedTask.completed
          ? "Task marked as incomplete"
          : "Task completed!"
      );
    }
  }

  function renderTask({ task }: { task: Task }) {
    return (
      <View style={style.taskItem}>
        <TouchableOpacity onPress={() => toggleComplete(task.id)}>
          <Text style={[style.taskText, task.completed && style.completedTask]}>
            {task.title}
          </Text>
        </TouchableOpacity>
        <View style={style.taskButtons}>
          <TouchableOpacity
            style={[style.button, style.completedButton]}
            onPress={() => toggleComplete(task.id)}
          >
            <Text style={style.buttonText}>
              {task.completed ? "Undo" : "Complete"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, style.deleteButton]}
            onPress={() => confirmDeleteTask(task.id)}
          >
            <Text style={style.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Tasks</Text>
      <Text style={style.secondTitle}>
        Created by TỪ GIA TUYỀN - 2124801030218
      </Text>
      <View style={style.inputContainter}>
        <TextInput
          style={style.input}
          placeholder="Task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={style.addbutton} onPress={addTask}>
          <Text style={style.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => renderTask({ task: item })}
        keyExtractor={(task) => task.id}
      />

      {/* Modal for notification message */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>{notificationMessage}</Text>
          </View>
        </View>
      </Modal>

      {/* Modal for confirm delete task <just in case some one change their mind> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmDeleteVisible}
        onRequestClose={() => {
          setConfirmDeleteVisible(false);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>
              Do you want to delete ?
            </Text>
            <View style={style.modalButton}>
              <TouchableOpacity
                style={[style.button, style.completedButton]}
                onPress={deleteTask}
              >
                <Text style={style.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.button, style.deleteButton]}
                onPress={() => setConfirmDeleteVisible(false)}
              >
                <Text style={style.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#16325B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFDC7F",
  },
  secondTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFDC7F",
  },
  inputContainter: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#78B7D0",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: "white",
  },
  addbutton: {
    backgroundColor: "#FFDC7F",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#16325B",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskItem: {
    backgroundColor: "#78B7D0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 5,
    borderRadius: 4,
    marginLeft: 10,
  },
  completedButton: {
    backgroundColor: "#FFDC7F",
  },
  deleteButton: {
    backgroundColor: "#FF5A5F",
  },
  buttonText: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
