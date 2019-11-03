<template>
    <v-card>
        <v-card-title>
        Students who sat for the exam
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="obj"
            :search = "search"
            class="elevation-1"
        >
            <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
                <span slot="activator">
                {{ props.header.text }}
                </span>
                <span>
                {{ props.header.text }}
                </span>
            </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.reg }}</td>
            <td class="text-xs-right"><v-chip class="white--text" color="cyan">{{ props.item.date }}</v-chip></td>
            <td class="text-xs-right">{{ props.item.paper }}</td>
            <td class="text-xs-right">{{ props.item.invigilator }}</td>
            </template>
        </v-data-table>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat style="color: #b47b44;" @click.native="exportCSV()"><img :src="images" style="margin-right: 10px;" alt="">Export Data to Excel</v-btn>
            <v-btn flat style="color: #b47b44;" @click.native="reload"><img :src="images1" style="margin-right: 10px;" alt="">refresh</v-btn>
        </v-card-actions>
        <dialog v-show="success">
            <v-card>
                <v-card-actions>
                    <v-btn @click.native="success = !success">Dismiss</v-btn>
                </v-card-actions>
            </v-card>
        </dialog>
    </v-card>
</template>

<script>
const {dialog} = require('electron').remote
import jetpack from 'fs-jetpack'
import axios from 'axios'
import _ from 'lodash'

const Json2csvParser = require('json2csv').Parser;

const fields = ['invigilator', 'name', 'paper', 'reg', 'date'];
 
const json2csvParser = new Json2csvParser({ fields });

// import fb2w from '../fbs/fbs';

// const db = fb2w.db();
window.dialog_csv = dialog
// window.fromdatabase2 = []
export default {
    data () {
        return {
            status: {
                on: false,
                text: ''
            },
            success: false,
            loading: false,
            empty: '',
            images: './static/11.svg',
            images1: './static/14.svg',
            search: '',
            headers: [
                {
                    text: 'Student Name',
                    align: 'left',
                    value: 'name'
                },
                { text: 'Registration No', value: 'reg' },
                { text: 'Date and Time', value: 'date' },
                { text: 'Unit', value: 'paper' },
                { text: 'Invigilator', value: 'invigilator' },
            ],
        }
    },
    computed: {
        
        logins: () => {
            // return window.fromdatabase2
        },
        obj: () => {
            window.temporary_data = []
            _.forEach(jetpack.read('exam_data.json', 'json'), (key, value) => {
                window.temporary_data.push(key)
                // window.temporary_data ['value'] = false
            })
            window.sanitized = []
            _.forEach(window.temporary_data, (key, value) => {
                key.details.paper = key.details.paper.replace('"','').replace('"','')
                key.details.invigilator = key.details.invigilator.replace('"','').replace('"','')
                if (key.details.date != null) {
                   key.details.date = key.details.date.replace('"','').replace('"','')
                }
                window.sanitized.push(key.details)
            })
            return window.sanitized
           // return _.uniqBy(window.sanitized, 'reg')
        }
    },
    methods: {
        examData() {
            axios.get('https://safaris-10946.firebaseio.com/exam.json')
            .then(res => {
                // window.exam_data = JSON.parse(res.data)
                console.log(res.data)
                // console.log(window.exam_data)
                jetpack.write('exam_data.json', res.data)
                // this.reload()
            })
            .catch(e => console.log(e))
        },
        reload () {
            window.location.reload()
        },
        loadData:  () => {
                window.nodata = {}
                jetpack.write('exam/fromdb.json', window.nodata);
                this.loading = true;
                db.ref('exam').on("child_added", v => {
                // state.packages.splice()
                let id = v.key
                let created = v.val().logs.code_created
                let used = v.val().logs.code_used
                let on = v.val().logs.date
                let login_type = v.val().logs.type
                let who_is = v.val().logs.name
                let validation = v.val().validation 
                let full_info = '{'  + '"name":' + who_is + ','  + '"type":' + login_type + ',' + '"on":' + on + ',' + '"code_created":' + created + ',' + '"code_used":' + used + ',' + '"validation":' + validation + '}'
                console.log(full_info)
                if (window.fromdatabase2.indexOf(full_info) < 0) {
                    window.fromdatabase2.unshift(JSON.parse(full_info))
                    jetpack.write('exam/fromdb.json', window.fromdatabase2);
                }
                // let id_keys = []
                // state.all_keys.push(id)
                // this.$store.commit('loaded')
                // console.log(window.fromdatabase)
                this.loading_packages = false
                console.log(this.obj)
            })
            // window.location.reload()

            
        },
        exportCSV() {
            let csv = json2csvParser.parse(this.obj)
            window.dialog_csv.showSaveDialog({
                title: 'Exam Data',
                defaultPath: '~/Desktop/exam_data.csv'
            }, function(result){
                jetpack.write(result, csv)
                alert(result, 'Data Saved Successfully')
            })

        }
    },
    created() {
        console.log(jetpack.cwd())
        this.examData()
    }
}
</script>
