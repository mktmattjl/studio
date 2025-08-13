
'use client';

import { useState } from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';
import { ListTodo, Plus, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  color: string;
}

const initialTasks: Task[] = [
  { id: 1, text: 'Review Chapter 5 of Biology', completed: false, color: '#3b82f6' },
  { id: 2, text: 'Complete React tutorial on hooks', completed: true, color: '#8b5cf6' },
  { id: 3, text: 'Draft history essay outline', completed: false, color: '#ef4444' },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskColor, setNewTaskColor] = useState('#3b82f6');

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      color: newTaskColor,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <DashboardCard title="Today's Tasks" icon={<ListTodo />}>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
             <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: task.color }} />
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={cn('flex-grow text-sm', task.completed ? 'text-muted-foreground line-through' : 'text-foreground')}
            >
              {task.text}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 pt-4 border-t border-border">
        <Input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-input text-input-foreground"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />

        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Palette style={{ color: newTaskColor }} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none">
                <HexColorPicker color={newTaskColor} onChange={setNewTaskColor} />
            </PopoverContent>
        </Popover>

        <Button onClick={handleAddTask} size="icon">
          <Plus />
        </Button>
      </div>
    </DashboardCard>
  );
}
