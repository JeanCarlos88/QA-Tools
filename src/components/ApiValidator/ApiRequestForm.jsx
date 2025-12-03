import React from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Select from '../Common/Select';
import Textarea from '../Common/Textarea';
import { HTTP_METHODS } from '../../constants';

const ApiRequestForm = ({
    formState,
    updateForm,
    onSubmit,
    loading,
    onLoadExample
}) => {
    const { url, method, headers, body } = formState;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-100">Configurar Requisição</h3>
                <Button variant="secondary" onClick={onLoadExample} type="button" className="text-sm">
                    📝 Carregar Exemplo
                </Button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                        <Input
                            label="URL da API"
                            type="text"
                            value={url}
                            onChange={(e) => updateForm('url', e.target.value)}
                            placeholder="https://jsonplaceholder.typicode.com/posts"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            💡 Dica: Use APIs públicas como jsonplaceholder.typicode.com para testar
                        </p>
                    </div>
                    <div>
                        <Select
                            label="Método HTTP"
                            value={method}
                            onChange={(e) => updateForm('method', e.target.value)}
                            options={HTTP_METHODS}
                        />
                    </div>
                </div>

                <Textarea
                    label="Headers (JSON)"
                    value={headers}
                    onChange={(e) => updateForm('headers', e.target.value)}
                    placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
                    rows={4}
                    helperText="Opcional: Headers personalizados em formato JSON"
                />

                {['POST', 'PUT', 'PATCH'].includes(method) && (
                    <Textarea
                        label="Body (JSON)"
                        value={body}
                        onChange={(e) => updateForm('body', e.target.value)}
                        placeholder='{"key": "value", "data": "example"}'
                        rows={6}
                        helperText="Body da requisição em formato JSON"
                    />
                )}

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Enviando...' : 'Enviar Requisição'}
                </Button>
            </form>
        </Card>
    );
};

export default ApiRequestForm;
