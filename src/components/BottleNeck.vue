<template>
  <div> 
    <v-row>
      <v-row>
        <h3>Preencha o Formulário</h3>
      </v-row>
      <v-row>
        <v-col>
          <treeselect
            :key="2"
            :multiple="false"
            :options="classesTree"
            placeholder="Escolha a Classe"
            @select="setSelectedClasse"
            :searchable="false"
          />
          
        </v-col>
        <v-col>
          <treeselect
            :key="3"
            :multiple="false"
            :options="assuntosTree"
            placeholder="Escolha o Assunto"
            @select="setSelectedAssunto"
            :searchable="false"
          />
          
        </v-col>
      </v-row>
      <div class="d-flex flex-column lg-12">
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="loader = 'loading'"
        >
          Mostrar Gargalos Gerais
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <div class="d-flex flex-column mb-8" v-if="mostrarResultado">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <bubble :bubbleData="bubbleData"/>
        </v-card>
      </div>

       <div class="d-flex flex-column mb-8">
          <v-card
            v-for="(item, index) in chartSet"
            :key="index"
            class="pa-2"
            outlined
            tile
          >
            <h3>{{item.descricao}} - Média Geral = {{item.avg_geral}}(Em Dias) </h3>
            <highcharts :options="item.data" :nomes="item.nomes"/> 
          </v-card>
        </div>
    </v-row> 
  </div>
</template>

<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import MultiChartColumn from './charts/MultiChartColumn.vue'

export default {
  components: { Treeselect, highcharts: MultiChartColumn },
  name: 'BottleNeck',
  data() {
    return {
      baseUrl: 'http://localhost:8000',
      assuntosTree: [],
      assuntoSelected: 6017,
      classesTree: [],
      classeSelected: 1116,
      loading: false,
      loader: null,
      analise: null,
      mostrarResultado: false,
      mediaServentia: [],
      mediaGeral: [],
      descricao: [],
      desvioPadrao: [],
      zscores: [],
      bubbleData: null,
      chartSet: [],

    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        if (this.loader != null) {
          this.getStatistics() 
        }
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      },
    },
  mounted() {
    this.getAssuntos()
    this.getClasses()
  },
  methods: {
    getStatistics () {
      this.loading = true
      this.mediaGeral = []
      this.mediaServentia = []
      this.descricao = []
      this.desvioPadrao = []
      this.zscores = []
      this.chartSet = [],
      axios
      .get(this.baseUrl + `/api/gargalos?codigoAssunto=${this.assuntoSelected}&codigoClasse=${this.classeSelected}`)
      .then(response => {
        this.analise = response.data
        this.loading = false
        this.bubbleData = this.analise.bolhas
        for (let item of this.analise.columns) {
          let medias = []
          let zscores = []
          let nomes = []
          for (let i of item.serventias) {
            medias.push(i.mean)
            zscores.push(i.zscore)
            nomes.push(i.nome)
          }
          let serie = {"series":[{
            nome: "Média Serventia",
            data: medias
          },{
            nome: "Z-Score",
            data: zscores
          }]}
          this.chartSet.push({
            "descricao": item.descricao,
            "data": serie,
            "nomes": nomes,
            "avg_geral": item.mean_geral,
          })
        }
        this.mostrarResultado = true
      })
    },
    getClasses() {
      axios
      .get(this.baseUrl + '/api/classes/list')
      .then(response => {
        this.classesTree = response.data
      })
    },
    getAssuntos() {
      axios
      .get(this.baseUrl + '/api/assuntos/list')
      .then(response => {
        this.assuntosTree = response.data
      })
    },
    getServentias() {
      axios
      .get(this.baseUrl + '/api/serventias/list')
      .then(response => {
        this.serventiasTree = response.data
      })
    }, 
    
    setSelectedClasse(node, id){
      this.classeSelected = node.id
      console.log(id)
    },

    setSelectedAssunto(node, id){
      this.assuntoSelected = node.id
      console.log(id)
    },

    setSelectedServentia(node, id){
      this.serventiaSelected = node.id
      console.log(id)
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  padding-left: 3%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
