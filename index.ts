import { Server } from 'ws';

const port = 5555;
const wss = new Server({ port });

enum Departments {
  Sales = 'sales',
  Rnd = 'rnd'
}

enum Actions {
  Delete = 'delete',
  Add = 'add'
}

const generateCommand = () => {
  let department = Departments.Sales;
  if (Math.random() >= 0.5) {
    department = Departments.Rnd;
  }
  let action = Actions.Delete;
  if (Math.random() >= 0.5) {
    action = Actions.Add;
  }
  return { action, department };
};

console.log(`Listening on http://localhost:${port}`);

wss.on('connection', function connection(ws) {
  const interval = setInterval(() => ws.readyState === ws.OPEN && ws.send(JSON.stringify(generateCommand())), 10);
  ws.on('error', () => clearInterval(interval));
  ws.on('close', () => clearInterval(interval));
});