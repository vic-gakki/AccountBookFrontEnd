<!--
<template>
  <div v-if="!route.hidden">
    <template v-if="route.children && route.children.length">
      <a-sub-menu :key="resolvePath(route.path)" >
        <item :icon="route.meta.icon" :title="route.meta.title"></item>
        <sidebar-item v-for="childRoute of route.children" :key="resolvePath(childRoute.path)" :route="childRoute" :base-path="resolvePath(childRoute.path)"></sidebar-item>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item class="ant-menu-item 1122" :key="resolvePath(route.path)" :path="resolvePath(route.path)">
        <side-link :to="resolvePath(route.path)">
            <item :icon="route.meta.icon" :title="route.meta.title"></item>
        </side-link>
      </a-menu-item>
    </template>
  </div>
</template>
-->
<script>
import { isExternal } from "@/utils";
import path from 'path'
import SideLink from './SideLink'
import Item from './Item'
export default {
  name: "SidebarItem",
  props: {
    route: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  components: {
    Item,
    SideLink,
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      routePath = path.resolve(this.basePath, routePath)
      return routePath
    }
  },
  render(h){
    // if(this.route.hidden){
      // return ''
    // }else if(this.route.children && this.route.children.length){
    //   return (
    //     <a-sub-menu key={this.resolvePath(this.route.path)}>
    //       <item icon={this.route.meta.icon} title={this.route.meta.title}></item>
    //       {this.route.children.map(childRoute => {
    //         return (
    //           <sidebar-item key={this.resolvePath(childRoute.path)} route={childRoute} base-path={this.resolvePath((this.route.path))}></sidebar-item>
    //         )
    //       })}
    //     </a-sub-menu>
    //   ) 
    // }else {
      return (
          <a-menu-item class="ant-menu-item" key={this.resolvePath(this.route.path)} path={this.resolvePath(this.route.path)}>
                <item icon={this.route.meta.icon} title={this.route.meta.title}></item>
          </a-menu-item>
      )
    // }
  }
};
</script>

<style></style>
