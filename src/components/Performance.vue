<template>
  <div>
    <v-row>
      <v-row>
        <h3>Preencha o Formulário</h3>
      </v-row>
      <v-row>
        <v-col>
          <treeselect 
            :key="1"
            :multiple="false"
            :options="serventiasTree"
            placeholder="Escolha a Serventia"
            @select="setSelectedServentia"
            :searchable="false"
          />
          
        </v-col>
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
     <div class="d-flex flex-row">
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="loader = 'loading'"
        >
          Analisar Desempenho
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <br><br>
      <div clss="d-flex">
        <div v-if="mostrarResultado">
          <div class="d-flex flex-column mb-8">
            <v-card
              class="pa-2"
              outlined
              tile
            >
              <column 
                :descricao="descricao"
                :mediaServentia="mediaServentia"
                :mediaGeral="mediaGeral"
                :desvioPadrao="desvioPadrao"
                :zscores="zscores"  
              />
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
              <h3>{{item.desc}}</h3>
              <highcharts :options="item.data"/> 
            </v-card>
           </div>
        </div>
        <div v-if="mostrarMensagem">
          <h3>{{mensagem}}</h3>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Speedometer from './charts/Speedometer.vue'

export default {
  components: { Treeselect, highcharts: Speedometer },
  name: 'Performance',
  data() {
    return {
      baseUrl: 'http://localhost:8000',
      serventiasTree: [],
      serventiaSelected: 10087,
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
      chartSet: [],
      mensagem: "A combinação não retornou nenhuma informação. Por favor faça uma nova seleção de parâmetros.",
      mostrarMensagem: false
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        if (this.loader != null) {
          this.getStatistics() 
        }
        
        this[l] = false
        this.loader = null
      },
    },
  mounted() {
    this.getServentias()
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
      this.chartSet = []
      axios
      .get(this.baseUrl + `/api/gargalos-serventia?codigoServentia=${this.serventiaSelected}&codigoAssunto=${this.assuntoSelected}&codigoClasse=${this.classeSelected}`)
      .then(response => {
        this.analise = response.data
        this.loading = false
        
        for (let item of this.analise.columns) {
          this.mediaGeral.push(item.avg_geral)
          this.mediaServentia.push(item.avg_serventia)
          this.descricao.push(item.descricao)
          this.desvioPadrao.push(item.std_geral)
          this.zscores.push(item.zscore)
        }
        for (let item of this.analise.speedometer) {
          let z = item.zscore
          if (z < -3) z = -3
          else if (z > 3) z = 3
          let serie = {name: "Speed", data: [z], tooltip: {valueSuffix: " z-score"}}
          this.chartSet.push({"data": {"series": [serie]}, "desc": item.descricao})
        }
        if (this.zscores.length > 0 || this.chartSet.length > 0) {
          this.mostrarResultado = true
          this.mostrarMensagem = false
        } else { 
          this.mostrarResultado = false
          this.mostrarResultado = true
        }
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
    }
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
