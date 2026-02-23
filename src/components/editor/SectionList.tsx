'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import type { Section } from '@/types/lp';

interface SectionListProps {
    sections: Section[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onMove: (id: string, direction: 'up' | 'down') => void;
    onToggleVisibility: (id: string) => void;
    onRename: (id: string, name: string) => void;
}

export default function SectionList({
    sections,
    selectedId,
    onSelect,
    onMove,
    onToggleVisibility,
    onRename,
}: SectionListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    const handleStartEdit = (section: Section, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(section.id);
        setEditName(section.name);
    };

    const handleSaveEdit = (id: string) => {
        if (editName.trim()) {
            onRename(id, editName.trim());
        }
        setEditingId(null);
        setEditName('');
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            handleSaveEdit(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
            setEditName('');
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    セクション一覧
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-2">
                {sections.map((section, index) => {
                    const isSelected = section.id === selectedId;
                    const isEditing = editingId === section.id;

                    return (
                        <div
                            key={section.id}
                            className={`group relative p-3 rounded-lg cursor-pointer transition-all ${isSelected
                                ? 'bg-blue-100 border border-blue-400'
                                : 'bg-white hover:bg-gray-100 border border-gray-200'
                                } ${!section.visible ? 'opacity-50' : ''}`}
                            onClick={() => onSelect(section.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <Input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onBlur={() => handleSaveEdit(section.id)}
                                            onKeyDown={(e) => handleKeyDown(e, section.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-7 text-sm bg-white"
                                            autoFocus
                                        />
                                    ) : (
                                        <p
                                            className="text-sm font-medium text-gray-800 truncate cursor-text hover:text-blue-600"
                                            onDoubleClick={(e) => handleStartEdit(section, e)}
                                            title="ダブルクリックで編集"
                                        >
                                            {section.name}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400">
                                        {section.visible ? '表示中' : '非表示'}
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-gray-800 hover:bg-gray-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMove(section.id, 'up');
                                    }}
                                    disabled={index === 0}
                                >
                                    ↑
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-gray-800 hover:bg-gray-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMove(section.id, 'down');
                                    }}
                                    disabled={index === sections.length - 1}
                                >
                                    ↓
                                </Button>
                                <div onClick={(e) => e.stopPropagation()} className="ml-1">
                                    <Switch
                                        checked={section.visible}
                                        onCheckedChange={() => onToggleVisibility(section.id)}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                    {sections.length} セクション
                </p>
            </div>
        </div>
    );
}
