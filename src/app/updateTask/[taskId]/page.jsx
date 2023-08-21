import React from 'react';
import TaskPage from '../../addTask/taskPage'

export const metadata = {
    title: "Update task",
  };

export default function page() {
  return (
    <TaskPage flag={true} />
  )
}