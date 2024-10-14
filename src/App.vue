<script setup lang="ts">
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Select from 'primevue/select';

import { ref, watchEffect, onMounted } from 'vue';
import type { FilterByFactory, FilterByPresence, Factories, Presences, Members } from "./types/main.ts";
import { members } from "./constanst/main.ts";

const selectedFactory = ref<Factories>({ name: '', code: ''});
const selectedPresence = ref<Presences>({ presence: '', code: ''});
const filteredFactory = ref<FilterByFactory>({
  all: members.value,
  f1: members.value.filter(member => member.pic === "Factory 1"),
  f2: members.value.filter(member => member.pic === "Factory 2"),
  f3: members.value.filter(member => member.pic === "Factory 3"),
  subproduct: members.value.filter(member => member.pic === "Subproduction"),
  project: members.value.filter(member => member.pic === "Project")
});
const filteredPresence = ref<FilterByPresence>({
  all: members.value,
  present: members.value.filter(member => member.presence === 'Present'),
  absent: members.value.filter(member => member.presence === 'Absent')
});
const factories = ref<Factories[]>([
  { name: 'All', code: 'all' },
  { name: 'Factory 1', code: 'f1' },
  { name: 'Factory 2', code: 'f2' },
  { name: 'Factory 3', code: 'f3' },
  { name: 'Project', code: 'project' },
  { name: 'Subproduction', code: 'subproduct' },
]);
const presences = ref<Presences[]>([
  {
    presence: 'All',
    code: 'all'
  },
  {
    presence: 'Present',
    code: 'present'
  },
  {
    presence: 'Absent',
    code: 'absent'
  },
]);

onMounted(() => {
  selectedFactory.value.code = 'all';
  selectedPresence.value.code = 'all';
});

watchEffect(async () => {
  let result = [];
  const factory: Members[] = filteredFactory.value[selectedFactory.value.code as keyof FilterByFactory];
  const presence: Members[] = filteredPresence.value[selectedPresence.value.code as keyof FilterByPresence];

  if (!selectedFactory.value.code && !selectedPresence.value.code) {
    return;
  }
  if (selectedFactory.value.code === 'all' && selectedPresence.value.code === 'all') {
    return members.value = filteredFactory.value[selectedFactory.value.code];
  }
  if (selectedFactory.value.code !== 'all' && selectedPresence.value.code !== 'all') {
    const merge = [...factory, ...presence];
    const filter = merge.filter(item => item.pic === selectedFactory.value.name && item.presence === selectedPresence.value.presence);
    return members.value = [...new Set(filter)];
  }
  else {
    if (selectedFactory.value.code !== 'all') {
      for (let i in factory) {
        result.push(factory[i]);
      }
    }
    else if (selectedPresence.value.code !== 'all') {
      for (let i in presence) {
        result.push(presence[i]);
      }
    }
    return members.value = result;
  }
})
</script>

<template>
  <main class="dark-mode px-40 py-2">
      <Card>
        <template #subtitle>
          <section class="flex justify-between items-center gap-2 mb-5">
            <h1 class="poppins-semibold text-xl text-slate-950 dark:text-slate-50">List Electric Members</h1>
            <div class="flex items-center gap-2">
              <Select v-model="selectedFactory" :options="factories" optionLabel="name" placeholder="Filter PIC" checkmark :highlightOnSelect="false" class="w-full md:w-44 text-xs" />
              <Select v-model="selectedPresence" :options="presences" optionLabel="presence" placeholder="Filter Presence" checkmark :highlightOnSelect="false" class="w-full md:w-44 text-xs" />
            </div>
        </section>
        </template>
        <template #content>
          <DataTable :value="members" tableStyle="min-width: 1rem" scrollable scrollHeight="45rem">
            <Column field="members" header="Members" class="text-sm">
              <template #body="props">
                <section class="flex items-center gap-1">
                  <Avatar :label="props.data.img" class="mr-2 border" :class="props.data.presence === 'Absent' ? 'border-red-600' : 'border-green-600'" size="small" shape="circle" />
                  <p>{{ props.data.members }}</p>
                </section>
              </template>
            </Column>
            <Column field="pic" header="PIC" class="text-sm"></Column>
            <Column field="presence" header="Presence" class="text-sm">
              <template #body="props">
                <Badge :value="props.data.presence" :severity="props.data.presence === 'Present' ? 'success' : 'danger'" size="small"/>
              </template>
            </Column>
            <Column field="hp" header="Handphone" class="text-sm"></Column>
          </DataTable>
          <h1 v-if="members.length === 0" class="text-center mt-2 tracking-widest leading-10">No Data Here.</h1>
        </template>
      </Card>
  </main>
</template>

<style scoped></style>
