<template>
  <div>
    <v-row>
      <v-row>
        <h3>Preencha o Formulário</h3></v-row>
      <v-row>
        <v-col>
          <treeselect
            :multiple="false"
            :options="serventiasTree"
            placeholder="Escolha a Serventia"
            @select="setSelectedServentia"
            :searchable="false"
          />
          
        </v-col>
        <v-col>
          <treeselect
            :multiple="false"
            :options="classesTree"
            placeholder="Escolha a Classe"
            @select="setSelectedClasse"
            :searchable="false"
          />
          
        </v-col>
        <v-col>
          <treeselect
            :multiple="false"
            :options="assuntosTree"
            placeholder="Escolha o Assunto"
            @select="setSelectedAssunto"
            :searchable="true"
          />
          
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="getStatistics()"
        >
          Mostrar Gargalos
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-row>
      <v-row>
        {{analise}}
      </v-row>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  name: 'BottleNeck',
  data() {
    return {
      baseUrl: 'http://localhost:8000',
      serventiasTree: [],
      serventiaSelected: null,
      assuntosTree: [],
      assuntoSelected: null,
      classessTree: [],
      classeSelected: null,
      loading: false,
      analise: null
    }
  },
  
  mounted() {
    this.getServentias()
    this.getAssuntos()
    this.getClasses()
  },
  methods: {
    getStatistics () {
      this.loading = true
      
      axios
      .get(this.baseUrl + `/api/gargalos-serventia?codigoServentia=${this.serventiaSelected}&codigoAssunto=${this.assuntoSelected}&codigoClasse=${this.classeSelected}`)
      .then(response => {
        this.analise = response.data
        console.log(response.data)
        this.loading = false
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
