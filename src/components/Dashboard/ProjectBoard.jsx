import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const initialColumns = {
  requested: {
    title: 'REQUESTED',
    items: [
      { id: '1', title: 'Buy Beverage', description: 'Lorem ipsum text...', tag: 'Task-4' },
      { id: '2', title: 'Measure Weather', description: 'Lorem ipsum text...', tag: 'Task-6' }
    ]
  },
  todo: {
    title: 'TO DO',
    items: [{ id: '4', title: 'Repair Drill', description: 'Lorem ipsum text...', tag: 'Task-8' }]
  },
  inProgress: {
    title: 'IN PROGRESS',
    items: [
      { id: '5', title: 'Align Telescope', description: 'Lorem ipsum text...', tag: 'Task-2' }
    ]
  },
  done: {
    title: 'DONE',
    items: [
      { id: '7', title: 'Align Engine Output', description: 'Lorem ipsum text...', tag: 'Task-1' }
    ]
  }
};

export default function ProjectBoard({ updateStats, isDarkMode }) {
  const [columns, setColumns] = useState(initialColumns);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = destination.droppableId !== source.droppableId ? [...destColumn.items] : sourceItems;

    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems }
    });
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      tag: `Task-${Math.floor(Math.random() * 100)}`
    };
    setColumns({
      ...columns,
      requested: { ...columns.requested, items: [...columns.requested.items, newItem] }
    });
    updateStats('totalTasks', 1);
    setNewProject({ title: '', description: '' });
    setShowNewProjectModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleDeleteTask = (taskId) => {
    const newColumns = {};
    Object.entries(columns).forEach(([columnId, column]) => {
      newColumns[columnId] = {
        ...column,
        items: column.items.filter(item => item.id !== taskId)
      };
    });
    setColumns(newColumns);
    updateStats('totalTasks', -1);
  };

  const handleUpdateTask = () => {
    const newColumns = {};
    Object.entries(columns).forEach(([columnId, column]) => {
      newColumns[columnId] = {
        ...column,
        items: column.items.map(item =>
          item.id === editingTask.id ? editingTask : item
        )
      };
    });
    setColumns(newColumns);
    setShowEditModal(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Overview</h2>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-white flex items-center gap-2"
        >
          <FaPlus /> New Project
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className={isDarkMode ? "bg-gray-800 p-4 rounded-lg" : "bg-white p-4 rounded-lg shadow-lg"}>
              <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
                {column.title}
                <span className="text-sm bg-gray-700 px-2 py-1 rounded">{column.items.length}</span>
              </h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={isDarkMode ? "bg-gray-700 p-4 rounded-lg" : "bg-gray-50 p-4 rounded-lg shadow"}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold">{item.title}</h4>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditTask(item)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(item.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                              <span className="text-xs bg-purple-500 px-2 py-1 rounded">{item.tag}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={isDarkMode ? "bg-gray-800 p-6 rounded-lg w-96" : "bg-white p-6 rounded-lg w-96 shadow-lg"}>
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              className={`w-full p-2 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              className={`w-full p-2 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-purple-600 rounded text-white"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-purple-600 rounded"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}