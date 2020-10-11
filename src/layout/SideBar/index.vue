<script>
import Item from './Item'
import SideLink from './SideLink'
import { isExternal } from "@/utils";
import path from 'path'
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  components: {
    Item,
    SideLink,
  },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  data(){
    let activeSub = this.$route.path.slice(0, this.$route.path.lastIndexOf('/'))
    activeSub = activeSub ? [activeSub] : []
    return {
      activeSub
    }
  },
  methods: {
    resolvePath(routePath, basePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      routePath = path.resolve(basePath, routePath)
      return routePath
    },
    renderSideItem(route, basePath = '/'){
      const path = this.resolvePath(route.path, basePath)
      if(route.hidden){
        return ''
      }else if(route.children && route.children.length){
        return (
          <a-sub-menu key={path} path={path}>
            <item slot="title" icon={route.meta.icon} title={route.meta.title}></item>
            {route.children.map(childRoute => {
             return this.renderSideItem(childRoute, path)
            })}
          </a-sub-menu>
        ) 
      }else {
        return (
          <a-menu-item key={path} path={path}>
            <side-link to={path}>
              <item icon={route.meta.icon} title={route.meta.title}></item>
            </side-link>
          </a-menu-item>
        )
      }
    },
    handleOpenChange(openKeys){
      this.activeSub = openKeys.length ? [openKeys[openKeys.length - 1]] : []
    },
    handleSelect({key}){
      let sub = key.slice(0, key.lastIndexOf('/'))
      this.activeSub = sub ? [sub] : []
    }
  },
  render(h){
    return (
      <a-menu theme="dark" mode="inline" default-selected-keys={[this.activeMenu]} onSelect={this.handleSelect} onOpenChange={this.handleOpenChange} open-keys={this.activeSub} class="menu-container">
        {this.permission_routes[0].children.map(route => {
          return this.renderSideItem(route)
        })}
      </a-menu>
    )
  }
};
</script>

<style></style>
