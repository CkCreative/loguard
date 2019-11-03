<template>
    <v-layout column justify-center>
        <v-flex>
        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                lOGS
                <v-spacer></v-spacer>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text v-model="logins">
                <v-list three-line>
                    <template v-for="(item, index) in obj">
                        <v-card flat height="80px" class="green--text" color="grey lighten-3" :key="index">
                            <v-card-actions>
                                <v-layout pt-4>
                                    <v-spacer></v-spacer>
                                    <v-flex class="headline text--xs-center">
                                        {{ item.name }}  
                                    </v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                        <v-list-tile
                        :key="item.code_created"
                        avatar
                        ripple
                        >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.on }}</v-list-tile-title>
                            <v-list-tile-sub-title> Token Generated: {{ item.code_created }}</v-list-tile-sub-title> 
                            <v-list-tile-sub-title> Token Used: {{ item.code_used }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text> Level {{ item.action }}
                                
                            </v-list-tile-action-text>
                             <v-icon
                                v-if="item.validation - item.code_created > 12"
                                color="red"
                                >star_border</v-icon>
                                <v-icon
                                v-else
                                color="green"
                                >star</v-icon>
                        </v-list-tile-action>
                        
                        </v-list-tile>
                        <v-chip :key="item.type" class="white--text" :color=" item.type==='Sign In' ? 'blue lighten-2' : 'yellow darken-3' ">{{ item.type }}</v-chip> <v-chip :key="index"> Validation: {{ item.validation }}</v-chip>
                        <v-divider v-if="index + 1 < obj.length" :key="index"></v-divider>
                    </template>
                </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="loadData">Load Data</v-btn>
                <v-btn flat @click.native="reload">Refresh</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import jetpack from 'fs-jetpack'
import fbw from '../fbs/fbs';

const db = fbw.db();

window.fromdatabase = []
export default {
    data () {
        return {
            loading: false,
            empty: ''
        }
    },
    computed: {
        
        logins: () => {
            return window.fromdatabase
        },
        obj: () => {
                return jetpack.read('fromdb.json', 'json');
        }
    },
    methods: {
        reload () {
            window.location.reload()
        },
            loadData:  () => {
                window.nodata = {}
                jetpack.write('fromdb.json', window.nodata);
                this.loading = true;
                db.ref('isstum').on("child_added", v => {
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
                if (window.fromdatabase.indexOf(full_info) < 0) {
                    window.fromdatabase.unshift(JSON.parse(full_info))
                    jetpack.write('fromdb.json', window.fromdatabase);
                }
                // let id_keys = []
                // state.all_keys.push(id)
                // this.$store.commit('loaded')
                // console.log(window.fromdatabase)
                this.loading_packages = false
                console.log(this.obj)
            })
            // window.location.reload()

            
        }
    }
}
</script>
