import React from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';

const ApiResponseDisplay = ({ response }) => {
    if (!response) return null;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    };

    return (
        <div className="space-y-4">
            <Card>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-100">Status da Resposta</h3>
                        <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${response.ok ? 'bg-green-950/30 text-green-400 border border-green-600' : 'bg-red-950/30 text-red-400 border border-red-600'
                                }`}>
                                {response.status} {response.statusText}
                            </span>
                            <span className="text-sm text-gray-400">
                                ⏱️ {response.duration}ms
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Headers da Resposta</h3>
                    <Button
                        variant="secondary"
                        onClick={() => handleCopy(response.headers)}
                        className="text-sm"
                    >
                        📋 Copiar
                    </Button>
                </div>
                <div className="bg-dark-800 p-4 rounded border border-dark-700 max-h-60 overflow-y-auto">
                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                        {JSON.stringify(response.headers, null, 2)}
                    </pre>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Body da Resposta</h3>
                    <Button
                        variant="secondary"
                        onClick={() => handleCopy(response.data)}
                        className="text-sm"
                    >
                        📋 Copiar
                    </Button>
                </div>
                <div className="bg-dark-800 p-4 rounded border border-dark-700 max-h-96 overflow-y-auto">
                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                        {typeof response.data === 'object'
                            ? JSON.stringify(response.data, null, 2)
                            : response.data
                        }
                    </pre>
                </div>
            </Card>
        </div>
    );
};

export default ApiResponseDisplay;
