import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { generateSafeId } from '../utils/security';

export const useChecklist = () => {
    const [checklists, setChecklists] = useState([]);
    const [activeChecklistId, setActiveChecklistId] = useState(null);
    const [alert, setAlert] = useState(null);

    // Load checklists from localStorage on mount
    useEffect(() => {
        const saved = getStorageItem(STORAGE_KEYS.CHECKLISTS, []);
        setChecklists(saved);
        if (saved.length > 0) {
            setActiveChecklistId(saved[0].id);
        }
    }, []);

    // Save checklists to localStorage whenever they change
    useEffect(() => {
        if (checklists.length > 0) {
            setStorageItem(STORAGE_KEYS.CHECKLISTS, checklists);
        }
    }, [checklists]);

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    const createChecklist = (name) => {
        if (!name.trim()) {
            showAlert('Por favor, insira um nome para o checklist', 'error');
            return false;
        }

        const newChecklist = {
            id: generateSafeId('checklist'),
            name: name,
            createdAt: new Date().toISOString(),
            items: []
        };

        setChecklists([...checklists, newChecklist]);
        setActiveChecklistId(newChecklist.id);
        showAlert('Checklist criado com sucesso!');
        return true;
    };

    const deleteChecklist = (id) => {
        const updated = checklists.filter(c => c.id !== id);
        setChecklists(updated);

        if (activeChecklistId === id) {
            setActiveChecklistId(updated.length > 0 ? updated[0].id : null);
        }

        showAlert('Checklist excluído com sucesso!');
    };

    const addItem = (text) => {
        if (!text.trim()) {
            showAlert('Por favor, insira o texto do item', 'error');
            return false;
        }

        const updated = checklists.map(checklist => {
            if (checklist.id === activeChecklistId) {
                return {
                    ...checklist,
                    items: [
                        ...checklist.items,
                        {
                            id: generateSafeId('item'),
                            text: text,
                            completed: false,
                            createdAt: new Date().toISOString()
                        }
                    ]
                };
            }
            return checklist;
        });

        setChecklists(updated);
        showAlert('Item adicionado com sucesso!');
        return true;
    };

    const toggleItem = (itemId) => {
        const updated = checklists.map(checklist => {
            if (checklist.id === activeChecklistId) {
                return {
                    ...checklist,
                    items: checklist.items.map(item =>
                        item.id === itemId ? { ...item, completed: !item.completed } : item
                    )
                };
            }
            return checklist;
        });

        setChecklists(updated);
    };

    const deleteItem = (itemId) => {
        const updated = checklists.map(checklist => {
            if (checklist.id === activeChecklistId) {
                return {
                    ...checklist,
                    items: checklist.items.filter(item => item.id !== itemId)
                };
            }
            return checklist;
        });

        setChecklists(updated);
        showAlert('Item removido com sucesso!');
    };

    const exportChecklist = () => {
        const checklist = checklists.find(c => c.id === activeChecklistId);
        if (!checklist) return;

        const exportData = JSON.stringify(checklist, null, 2);
        const blob = new Blob([exportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${checklist.name.replace(/\s+/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showAlert('Checklist exportado com sucesso!');
    };

    const activeChecklist = checklists.find(c => c.id === activeChecklistId);

    return {
        checklists,
        activeChecklist,
        activeChecklistId,
        setActiveChecklistId,
        alert,
        setAlert, // Exported just in case, but showAlert is preferred
        actions: {
            createChecklist,
            deleteChecklist,
            addItem,
            toggleItem,
            deleteItem,
            exportChecklist,
            showAlert
        }
    };
};
