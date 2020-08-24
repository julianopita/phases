const Dropdown = {
    name : 'Dropdown',
    template : `<div class="menu-item" @click="isOpen= !isOpen">
        <a href="#">
            {{title}}
        </a>
        <transition name="fade" appear>
            <div id="sub-menu" v-if="isOpen">
                <div v-for="(item,i) in items" :key="i" class="menu-item">
                    <a :href="item.link">{{item.title}}</a>
                </div>
            </div>
        </transition>
        <link rel="stylesheet" href="../../styles/dropdown.css">


    </div>`,
    props : ['title','items'],
    data(){
        return {
            isOpen : false
        }
    }
}

export default Dropdown;