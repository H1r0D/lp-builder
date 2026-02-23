import { X, Calendar } from 'lucide-react';
import { Announcement } from '@/lib/data/announcements';

interface AnnouncementModalProps {
    isOpen: boolean;
    onClose: () => void;
    announcement: Announcement | null;
}

export function AnnouncementModal({ isOpen, onClose, announcement }: AnnouncementModalProps) {
    if (!isOpen || !announcement) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            {/* Darker Overlay for Announcements */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-100/50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="閉じる"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Area */}
                <div className="px-6 pt-8 pb-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2 text-slate-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{announcement.date}</span>
                    </div>
                    <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight pr-6">
                        {announcement.title}
                    </h2>
                </div>

                {/* Content Area (Scrollable) */}
                <div className="px-6 py-6 overflow-y-auto overscroll-contain">
                    <div className="prose prose-sm sm:prose-base prose-slate max-w-none text-slate-600 space-y-4 whitespace-pre-wrap leading-relaxed">
                        {announcement.content}
                    </div>
                </div>

                {/* Footer Area */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-lg transition-colors"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}
