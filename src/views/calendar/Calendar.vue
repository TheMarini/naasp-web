<template>
  <div class="calendar p-4">
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <calendar-icon size="2.3x" class="title-icon"></calendar-icon>
        <h2 class="ml-3 mb-0"><b>Agenda</b></h2>
      </div>
    </header>
    <article class="mt-4">
      <FullCalendar
        default-view="dayGridMonth"
        locale="pt-br"
        :header="header"
        :plugins="plugins"
        :button-text="buttonText"
      />
    </article>
  </div>
</template>

<script>
// Icons
import { CalendarIcon } from 'vue-feather-icons';

// FullCalendar
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
  name: 'Calendar',
  components: {
    CalendarIcon,
    FullCalendar,
  },
  data() {
    return {
      plugins: [dayGridPlugin, timeGridPlugin],
      header: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        right: 'today prevYear,prev,next,nextYear',
      },
      buttonText: {
        today: 'hoje',
        month: 'mês',
        week: 'semana',
        day: 'dia',
        list: 'lista',
      },
    };
  },
};
</script>

<style>
/* FullCalendar */
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

/* TODO: check repeated styles like this */
header {
  color: #707070;
}
</style>
