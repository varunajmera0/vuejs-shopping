<template>
  <div class="card" style="width: 80%;">
    <div class="card-block">
      <h5 class="card-title text-center" style="padding: 10px;">Amount Summary</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="product"><h6>Sub Total: <span style="float: right;">{{product}}</span></h6></li>
      <li class="list-group-item" v-if="taxes"><small><b>Taxes: <span style="float: right;">{{taxes}}</span></b></small></li>
      <li class="list-group-item" v-if="total"><strong>Total Amount: <span style="float: right;"> {{total}}</span></strong></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['product', 'taxes', 'total']
  }
</script>
