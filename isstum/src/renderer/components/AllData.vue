<template>
    <v-card>
        <v-card-title>
        All Security Logs
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
            :items="object"
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
            <template slot="items" slot-scope="props" >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right"><v-icon
                                :color="props.item.validation-props.item.code_created > 15 ? 'red' : 'green'"
                                >star</v-icon> </td>
            <td class="text-xs-right">{{ props.item.code_created }}</td>
            <td class="text-xs-right">{{ props.item.code_used }}</td>
            <td class="text-xs-right">{{ props.item.validation }}</td>
            <td class="text-xs-right">{{ props.item.place }}</td>
            <td class="text-xs-right">
                <v-chip class="white--text" :color=" props.item.type==='Sign In' ? 'cyan lighten-1' : 'yellow darken-3' "> {{ props.item.type }} </v-chip>
               </td>
            </template>
        </v-data-table>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat style="color: #b47b44;" @click.native="exportCSV()"> <img :src="image" style="margin-right: 10px;" alt=""> Export Data to Excel</v-btn>
            <v-btn flat style="color: #b47b44;" @click.native="reload()"> <img :src="image1" style="margin-right: 10px;" alt=""> refresh</v-btn>
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
const remote = require('electron').remote;
const elec_app = remote.app;

const Json2csvParser = require('json2csv').Parser;

const fields = ['code_created', 'code_used', 'date', 'name', 'type', 'place', 'validation'];
 
const json2csvParser = new Json2csvParser({ fields });

// import fb2w from '../fbs/fbs';

// const db = fb2w.db();
window.dialog_csv2 = dialog
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
            image: './static/11.svg',
            image1: './static/14.svg',
            empty: '',
            search: '',
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    value: 'name'
                },
                { text: 'Time of Activity', value: 'date' },
                { text: 'Level', value: 'level' },
                { text: 'Token Requested', value: 'code_created' },
                { text: 'Tokent Attached', value: 'code_used' },
                { text: 'Validation Token', value: 'validation' },
                { text: 'The Place', value: 'place' },
                { text: 'Type of Activity', value: 'type' },
            ],
        }
    },
    computed: {
        
        logins: () => {
            // return window.fromdatabase2
        },
        object: () => {
            window.temporary_data_sec = []
            _.forEach(jetpack.read(elec_app.getPath('documents')+'/security_logs.json', 'json'), (key, value) => {
                window.temporary_data_sec.unshift(key)
                // window.temporary_data ['value'] = false
            })
            window.sanitized_sec = []
            _.forEach(window.temporary_data_sec, (key, value) => {
               // key.details.paper = key.details.paper.replace('"','')
               // key.details.invigilator = key.details.invigilator.replace('"','')
                key.logs.validation = key.validation.replace('"','').replace('"','')
                key.logs.name = key.logs.name.replace('"','').replace('"','')
                key.logs.date = key.logs.date.replace('"','').replace('"','')
                key.logs.code_created = key.logs.code_created.replace('"','').replace('"','')
                key.logs.code_used = key.logs.code_used.replace('"','').replace('"','')
                key.logs.type = key.logs.type.replace('"','').replace('"','')
                key.logs.place = key.logs.place.replace('"','').replace('"','')
                window.sanitized_sec.push(key.logs)
            })
            return window.sanitized_sec
        }
    },
    methods: {
        examData() {
            axios.get('https://safaris-10946.firebaseio.com/loguard.json')
            .then(res => {
                // window.exam_data = JSON.parse(res.data)
                console.log(res.data)
                // console.log(window.exam_data)
                jetpack.write(elec_app.getPath('documents')+'/security_logs.json', res.data)
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
            let csv = json2csvParser.parse(this.object)
            window.dialog_csv2.showSaveDialog({
                title: 'Security Logs',
                defaultPath: '~/Desktop/security_logs.csv'
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
