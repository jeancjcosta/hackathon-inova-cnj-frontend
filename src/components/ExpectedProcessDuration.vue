<template>
  <div>
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
          @click="getStatistics"
        >
          Calcular Tempo
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <diV v-if="mostrarResultado">
        <v-card>
          <h3> O tempo estimado para tramitação processual de acordo com os parâmtros escolhidos é de {{analise}} dias.</h3>
        </v-card>
      </diV>
  </div>
</template>

<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'ExpectedProcessDuration',
  components: {Treeselect},
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
      analise: null,
      color: "info",
      mostrarResultado: false
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
      //this.color = "normal"
      axios
      .get(this.baseUrl + `/api/expectativa-tempo-tramitacao?codigoServentia=${this.serventiaSelected}&codigoAssunto=${this.assuntoSelected}&codigoClasse=${this.classeSelected}`)
      .then(response => {
        this.analise = Math.round(response.data[0])
        this.loading = false
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
