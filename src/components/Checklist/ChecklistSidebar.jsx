import React, { useState } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Input from '../Common/Input';

const ChecklistSidebar = ({
    checklists,
    activeChecklistId,
    onSelectChecklist,
    onCreateChecklist,
    onDeleteChecklist,
    isCreating,
    setIsCreating
}) => {
    const [newChecklistName, setNewChecklistName] = useState('');

    const handleCreate = () => {
        if (onCreateChecklist(newChecklistName)) {
            setNewChecklistName('');
            setIsCreating(false);
        }
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (confirm('Tem certeza que deseja excluir este checklist?')) {
            onDeleteChecklist(id);
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Meus Checklists</h3>
                <Button
                    onClick={() => setIsCreating(!isCreating)}
                    className="text-sm py-1 px-2"
                >
                    +
                </Button>
            </div>

            {isCreating && (
                <div className="mb-4 space-y-2">
                    <Input
                        value={newChecklistName}
                        onChange={(e) => setNewChecklistName(e.target.value)}
                        placeholder="Nome do checklist"
                        onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                    />
                    <div className="flex space-x-2">
                        <Button onClick={handleCreate} className="text-sm py-1 px-3">
                            Criar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsCreating(false);
                                setNewChecklistName('');
                            }}
                            className="text-sm py-1 px-3"
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                {checklists.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Nenhum checklist ainda
                    </p>
                ) : (
                    checklists.map((checklist) => (
                        <div
                            key={checklist.id}
                            className={`p-3 rounded cursor-pointer transition-colors ${activeChecklistId === checklist.id
                                    ? 'bg-primary-950/30 border-primary-600 border-2'
                                    : 'bg-dark-800 hover:bg-dark-700 border border-dark-700'
                                }`}
                        >
                            <div
                                onClick={() => onSelectChecklist(checklist.id)}
                                className="flex-1"
                            >
                                <div className="font-medium text-sm text-gray-200">{checklist.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {checklist.items.length} itens
                                </div>
                            </div>
                            <button
                                onClick={(e) => handleDelete(e, checklist.id)}
                                className="text-red-400 hover:text-red-300 text-xs mt-2"
                            >
                                Excluir
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default ChecklistSidebar;
