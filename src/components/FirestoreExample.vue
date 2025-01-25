<!--
<template>
  <div>
    <h1>Firestore Example</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>

  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase.js';

  export default {
    name: 'FirestoreExample',
    setup() {
      const items = ref([]);

      const fetchItems = async () => {
        const QuerySnapshot = awaits getDocs(collection(db,'items'));
        item.value = querySnapshot.docs.map(doc => ({ id, doc.id, ...doc.data() }));
      };

      onMounted(() => {
        fetchItems();
      });

      return{
        items,
      };
    },
  };

</script>
-->
