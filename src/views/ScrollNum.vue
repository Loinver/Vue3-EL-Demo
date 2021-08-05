<template>
  <ul class="flex">
    <ScrollNum v-for="(num, idx) of numArr" :key="idx" as="li" :i="num" :delay="idx + 1" class="num" />
  </ul>
</template>

<script>
import ScrollNum from '@/components/ScrollNum';

export default {
  name: 'App',
  components: { ScrollNum },
  data: () => ({ num: 886 }),
  computed: {
    numArr() {
      const str = String(this.num);
      return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])];
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
