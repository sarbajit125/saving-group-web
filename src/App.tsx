
import './App.css'
import { Text, Paper, Button } from '@mantine/core';
function App() {
  return (
    <Paper shadow="md" withBorder  p="xl">
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
      <Button variant="filled">Button</Button>;
    </Paper>
  )
}

export default App
