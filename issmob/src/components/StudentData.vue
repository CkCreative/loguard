<template>
    <v-content v-show="show">
        <v-container fluid>
            <v-layout column wrap>
                <v-flex>
                    <v-card>
                        <v-list>
                            <template v-for="(student,index) in details">
                                <v-list-tile :key="index">
                                    <v-list-tile-title> {{ student.name }} </v-list-tile-title> <br>
                                    <v-list-tile-content> {{student.reg}} </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                        <v-card-actions>
                            <v-btn @click.native="getStudentData">Load Data</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>



<script>
import axios from 'axios'
export default {
    data() {
        return {

        }
    },
    computed: {
        details: () => {
            return window.store.getters.student_data
        },
        show: () => {
            if (details != null) {
                return false
            }
            else {
                return true
            }
        }
        
    },
    created () {
        window.store.state.route_is = 'students' 
    },
    methods: {
        getStudentData() {
        // this.data = text
        window.store.state.sending = true
        axios.get('https://safaris-10946.firebaseio.com/students.json')
        .then(response => {
          window.store.state.progress = "updating student data...Please wait"            
          let studentdata = response.data
          localStorage.setItem('student_data', JSON.stringify(response.data))
          window.store.state.student_data = studentdata 
        }).then(function () {
          window.store.state.sending = false
        })
      },
    }
}
</script>
