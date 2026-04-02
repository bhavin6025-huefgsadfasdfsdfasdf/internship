"use client";

import React, { useState } from "react";
import { Plus, Check, Trash2, ListChecks } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function PersonalTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([{ id: Date.now(), text: inputValue.trim(), completed: false }, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <ListChecks size={16} />
          </div>
          <div>
            <CardTitle>Personal Backlog</CardTitle>
            <CardDescription className="text-xs">Task tracking</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={addTodo} className="relative mb-4">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pr-10"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus size={16} />
          </button>
        </form>

        <div className="space-y-2 min-h-[100px]">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-gray-400 border border-dashed border-border rounded-lg">
              <Check size={18} className="mb-1" />
              <span className="text-xs">No active tasks</span>
            </div>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id} 
                onClick={() => toggleTodo(todo.id)}
                className="flex items-center justify-between group p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {todo.completed && <Check size={10} className="text-primary-foreground" />}
                  </div>
                  <span className={`text-sm transition-colors ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-foreground'
                  }`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={(e) => removeTodo(todo.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-rose-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
