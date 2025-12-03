import React, { useState } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Input from '../Common/Input';

const ChecklistMainContent = ({
    activeChecklist,
    onAddItem,
    onToggleItem,
    onDeleteItem,
    onExport,
    onCreateFirst // Callback to open creation form if no checklist exists
}) => {
    const [newItemText, setNewItemText] = useState('');

    if (!activeChecklist) {
        return (
            <Card className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Nenhum checklist selecionado</h3>
                <p className="text-gray-400 mb-6">
                    Crie ou selecione um checklist para começar
                </p>
                <Button onClick={onCreateFirst}>
                    Criar Primeiro Checklist
                </Button>
            </Card>
        );
    }

    const completedCount = activeChecklist.items.filter(i => i.completed).length;
    const totalCount = activeChecklist.items.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const handleAdd = () => {
        if (onAddItem(newItemText)) {
            setNewItemText('');
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold">{activeChecklist.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Criado em {new Date(activeChecklist.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                </div>
                <Button
                    variant="secondary"
                    onClick={onExport}
                    className="text-sm"
                >
                    💾 Exportar
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span className="font-semibold">
                        {completedCount}/{totalCount} ({progress}%)
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Add New Item */}
            <div className="flex space-x-2 mb-6">
                <Input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Adicionar novo item..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1"
                />
                <Button onClick={handleAdd}>Adicionar</Button>
            </div>

            {/* Items List */}
            <div className="space-y-2">
                {activeChecklist.items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p className="text-lg mb-2">📝</p>
                        <p>Nenhum item ainda. Adicione o primeiro item acima!</p>
                    </div>
                ) : (
                    activeChecklist.items.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center space-x-3 p-3 rounded border ${item.completed
                                    ? 'bg-green-950/20 border-green-600/50'
                                    : 'bg-dark-800 border-dark-700'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => onToggleItem(item.id)}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span
                                className={`flex-1 ${item.completed
                                        ? 'line-through text-gray-500'
                                        : 'text-gray-200'
                                    }`}
                            >
                                {item.text}
                            </span>
                            <button
                                onClick={() => onDeleteItem(item.id)}
                                className="text-red-400 hover:text-red-300 text-sm"
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default ChecklistMainContent;
