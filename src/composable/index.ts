import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Socket, io } from 'socket.io-client';
import { useStore } from '../store/main';
import { Members, FilterByFactory, FilterByPresence } from '../types/main';

export function useWebSocket(url: string): Socket {
  const socket: Socket = io(url);
  socket.on('connect', () => {
    console.log('connect to socket server');
  });
  socket.on('test', (msg) => {
    const store = useStore();
    const { presencing } = storeToRefs(store);
    presencing.value = msg.slice(1, -1).split(',').map(Number);
  });
  return socket;
}

export function useMembers(listPresences: number[]): Members[] {
  return [
    {
      members: '',
      img: '',
      pic: '',
      presence: listPresences[0] === 1 ? 'Present' : 'Absent',
      hp: '',
    }
  ];
}

export function useFilter(members: Members[]): { filteredFactory: FilterByFactory, filteredPresence: FilterByPresence } {
  const filteredFactory = ref<FilterByFactory>({
    all: members,
    f1: members.filter((member) => member.pic === 'Factory 1'),
    f2: members.filter((member) => member.pic === 'Factory 2'),
    f3: members.filter((member) => member.pic === 'Factory 3'),
    subproduct: members.filter((member) => member.pic === 'Subproduction'),
    project: members.filter((member) => member.pic === 'Project'),
  });

  const filteredPresence = ref<FilterByPresence>({
    all: members,
    present: members.filter((member) => member.presence === 'Present'),
    absent: members.filter((member) => member.presence === 'Absent'),
  });

  return {
    filteredFactory: filteredFactory.value,
    filteredPresence: filteredPresence.value
  }
}


