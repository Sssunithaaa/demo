import React, { useState } from 'react';
import { Calendar, Clock, MoreVertical, X, Save } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

// Define interfaces for type safety
interface Journal {
    content: string;
    date: string;
}

interface Event {
    date: string;
    title: string;
    color: string;
    gradient: string;
}

const CountdownApp = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    // Initialize journals with a proper type and empty object
    const [journals, setJournals] = useState<Record<string, string>>({});
    const [currentJournal, setCurrentJournal] = useState<string>('');

    const startDate = new Date('2024-01-01');
    const endDate = new Date('2027-10-01');
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const events: Event[] = [
        { date: '2024-12-25', title: 'Christmas', color: 'bg-rose-400', gradient: 'from-rose-400 to-red-400' },
        { date: '2024-12-31', title: 'New Year Eve', color: 'bg-violet-400', gradient: 'from-violet-400 to-purple-400' },
        { date: '2025-01-01', title: 'New Year', color: 'bg-blue-400', gradient: 'from-blue-400 to-cyan-400' }
    ];

    const boxesPerRow = 20;
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const handleDayClick = (index: number) => {
        const clickedDate = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
        setSelectedDate(clickedDate);
        const dateKey = clickedDate.toISOString().split('T')[0];
        setCurrentJournal(journals[dateKey] || '');
    };

    const saveJournal = () => {
        if (selectedDate) {
            const dateKey = selectedDate.toISOString().split('T')[0];
            setJournals(prev => ({
                ...prev,
                [dateKey]: currentJournal
            }));
        }
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-slate-900 text-white p-4 sm:p-6">
            <div className="relative max-w-6xl mx-auto">
                {/* Header Card */}
                <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-teal-400 to-emerald-400 p-2.5 rounded-xl">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                        Countdown to 2027
                                    </h1>
                                    <p className="text-zinc-400 text-sm mt-1">October Journey</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/5 rounded-xl px-4 py-2">
                                    <span className="text-sm text-zinc-400">Remaining</span>
                                    <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                        {daysLeft} days
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5 text-teal-400" />
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Grid Card */}
                <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl mb-6">
                    <CardContent className="p-6">
                        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${boxesPerRow}, 1fr)` }}>
                            {Array.from({ length: totalDays }).map((_, index) => {
                                const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
                                const dateStr = date.toISOString().split('T')[0];
                                const hasJournal = journals[dateStr];
                                const isEvent = events.some(event => event.date === dateStr);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleDayClick(index)}
                                        className={`
                      aspect-square rounded-md relative transition-all duration-200
                      ${index < daysPassed ? 'bg-gradient-to-br from-teal-400/80 to-emerald-400/80' : 'bg-white/5'}
                      ${selectedDate && dateStr === selectedDate.toISOString().split('T')[0]
                                                ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900'
                                                : 'hover:bg-white/10'}
                    `}
                                    >
                                        {hasJournal && (
                                            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                                        )}
                                        {isEvent && (
                                            <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Journal Card */}
                <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                    {selectedDate ? formatDate(selectedDate) : "Today's Entry"}
                                </h2>
                                <p className="text-zinc-400 text-sm mt-1">Write your thoughts...</p>
                            </div>
                            <button
                                onClick={saveJournal}
                                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <Save className="w-4 h-4" />
                                <span className="text-sm font-medium">Save</span>
                            </button>
                        </div>
                        <textarea
                            value={currentJournal}
                            onChange={(e) => setCurrentJournal(e.target.value)}
                            className="w-full h-40 p-4 rounded-xl bg-white/5 border border-white/10 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 resize-none text-white placeholder-zinc-500 focus:outline-none transition-all"
                            placeholder={selectedDate ? `Write your thoughts for ${formatDate(selectedDate)}...` : "Write your thoughts for today..."}
                        />
                    </CardContent>
                </Card>

                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 right-0 w-80 bg-gradient-to-b from-zinc-900/95 to-slate-900/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-teal-400" />
                                <h2 className="text-lg font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                    Events
                                </h2>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-400/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${event.color}`} />
                                        <span className="font-medium text-white">{event.title}</span>
                                    </div>
                                    <div className="text-sm text-zinc-400 mt-2 ml-5">{event.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownApp;