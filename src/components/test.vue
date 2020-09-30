<template>
<div class='test'>
    <div class="input-div">
        <div class="first-line">
            <a-input placeholder="Basic usage" class="my_ipt" :value="inputValue" @change="handleChange" />
            <a-button type="primary" class="button-div" @click="addItem">
                 添加
            </a-button>       
        </div>
        <div class="two-line">
             <a-list item-layout="horizontal" :data-source="done" bordered>
                <a-list-item slot="renderItem" slot-scope="item,index">
                    <!-- 复选框 -->
                    <a-checkbox :checked="item.done" @change="(e) =>{cbStatus(e,item.id)}">{{item.title}}</a-checkbox>
                   
                    <a slot="actions" @click="()=>{delItem(index)}">删除</a>
                </a-list-item>
                <!-- footer区域 -->
                <div slot="footer" class="footer">
                    <!-- 未完成个数 -->
                    <span>{{doneLength}}条剩余</span>
                    <!-- 操作按钮 -->
                    
                    <a-button-group class="button-group">
                        <a-button :type="doneKey == 'alldone'?'primary':'default'" @click="changeButton('alldone')">全部</a-button>
                        <a-button :type="doneKey == 'undone'?'primary':'default'" @click="changeButton('undone')">未完成</a-button>
                        <a-button :type="doneKey == 'done'?'primary':'default'" @click="changeButton('done')">已完成</a-button>
                    </a-button-group>
                    <a slot="actions" @click="clean">清除已完成</a>

                </div>
            </a-list>   
        </div>
    </div>
    
</div>
</template>
<script >
import { mapState,mapGetters} from "vuex"
export default{
    data(){
        return {
           value:'',
          
            loading: false,
            finished: false,
          
        }
    },
    created(){
        this.$store.dispatch("gets")
    },
    computed:{
        ...mapState(["inputValue","doneKey"]),
        ...mapGetters(['doneLength','done'])
    },
    methods:{
        // ...mapMutations(['changeInputvalue']),
        handleChange(e){
           this.$store.commit("changeInputvalue",e.target.value)
        },
        //添加项目
        addItem(){
            console.log('ok')
           if(this.$store.state.inputValue.trim().length<=0){
               return this.$message.warning("三上没穿衣服")
           }
           this.$store.commit("add")
        },
        //删除项目
        delItem(index){
            this.$store.commit('del',index)
        },
        //复选框状态的管理
        cbStatus(e,id){
            console.log(e.target.checked)
            let obj = {
                id : id,
                status:e.target.checked
            }
            this.$store.commit('statusChange',obj)
        },
        //清除已完成
        clean(){
            this.$store.commit("cleansuc")
        },
        //切换按钮状态
        changeButton(key){
            console.log(key)
            this.$store.commit("changedoneKey",key)
        }
    }
}
</script>
<style lang='stylus' scoped>
    body,html {
        margin: 0px;
        padding: 0;
    }
    .my_ipt{
        width : 300px;
        margin-right:10px;
       
    }
    .input-div{
        margin: 5px;
       
    }
    .two-line{
        width:400px;
        margin-top:10px
    }
    .button-group{
        margin-left:5px;
        margin-right:10px;

    }
  
    
   
</style>