<template>
  <FullCalendar
    ref="fullCalendar"
    class="calendar"
    theme-system="bootstrap"
    default-view="dayGridMonth"
    locale="pt-br"
    :events="events"
    :header="header"
    :plugins="plugins"
    :button-text="buttonText"
    :now-indicator="true"
    :selectable="selectable"
    :select-mirror="true"
    :unselect-auto="false"
    @select="select"
  />
</template>

<script>
// FullCalendar
import FullCalendar from '@fullcalendar/vue';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      plugins: [
        bootstrapPlugin,
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
      ],
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
  mounted() {
    this.$emit('update:calendarApi', this.$refs.fullCalendar.getApi());
  },
  methods: {
    select(info) {
      this.$emit('select', info);
    },
  },
};
</script>

<style scoped>
/* FullCalendar */
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fortawesome/fontawesome-free/css/all.css';

/* Overrides */
.calendar >>> .fc-today-button {
  border-radius: 10px;
}

.calendar >>> .btn-group button:first-child {
  border-radius: 10px 0 0 10px;
}

.calendar >>> .btn-group button:last-child {
  border-radius: 0 10px 10px 0;
}

.calendar >>> .fc-view-container {
  background-color: #fff;
}
</style>
