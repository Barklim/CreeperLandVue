<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class FooterComponent extends Vue {}
</script>

<template>
  <footer>
    <div class='wrapper'>

      <div class="about">
        <div class="logo-area">
          <a class="logo" href="/">Creeper Land</a>
          <div class="copyright">
            Создано с помощью 
            <a href="https://barklim.github.io/" title="Trade MC - автодонат на ваш игровой сервер" class='links_textDecoration'>Barky </a>
            © 2020
          </div>
        </div>
        <div class="social">
          <a rel="nofollow" class="vk" href="https://vk.com/creeper.land"><i class="fa fa-vk"></i>
            <font-awesome-icon :icon="['fab', 'vk']" />
          </a>
          <a rel="nofollow" class="discord" href="https://discord.gg/55VpefK"><i class="discord icon"></i>
            <font-awesome-icon :icon="['fab', 'discord']" /></a>
        </div>
      </div>

      <div class="content">
        <div class="links">
          <div class="title">Ссылки</div>
            <ul>
              <li><a href="/votes" target="_self" class="links_textDecoration">Ссылки на мониторинги</a></li>
            </ul>
          </div>
          <div class="widget-vk">
              <div class="widget-area">
                <div id="vk_groups" style="width: 300px; height: 160.4px; background: none;">
                  <iframe 
                    name="fXD6c7f3" 
                    frameborder="0" 
                    src="https://vk.com/widget_community.php?app=0&amp;width=300px&amp;_ver=1&amp;gid=196036402&amp;mode=1&amp;color1=ffffff&amp;color2=&amp;color3=&amp;class_name=&amp;no_cover=1&amp;url=https%3A%2F%2Fcreeper.land%2F&amp;referrer=&amp;title=Creeper%20Land&amp;1739bb4cb51" 
                    width="300" 
                    height="141" 
                    scrolling="no" 
                    id="vkwidget2" 
                    style="overflow: hidden; height: 160.4px;">
                  </iframe>
              </div>
            </div>
          </div>
      </div>

    </div>
  </footer>
</template>

<style lang="scss" scoped>

:after, 
:before {
    box-sizing: inherit;
}

footer {
  color: #fff;
  background: #111;

  .about {
    @media screen and (min-width: 480px) {
      color: red;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
    }
    .logo-area {
      font-size: 13px;
      text-align: initial;
    }
    .logo {
      margin-bottom: 0;
      display: inline-block;
    }
    .copyright {
      font-size: 80%;
      color: #999;
      /* */
      margin-top: 6px;

      a {
        color: #21ba45;
      }
    }

    .social {
      -ms-flex-positive: 1;
      flex-grow: 1;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin: 10px 0 0 -5px;
      @media screen and (min-width: 480px) {
        -ms-flex-pack: end;
        justify-content: flex-end;
        margin: 0;
      }
      a {
        width: 30px;
        height: 30px;
        background: #191919;
        text-align: center;
        line-height: 30px;
        color: hsla(0,0%,100%,.4);
        margin-left: 5px;
        transition: all .1s ease;
        i {
          margin: 0;
          line-height: 1;
          &:before {
            /* content: "\f189"; */
          }
        }
      }
      .vk {
        &:hover {
          background: #4d7198;
          text-decoration: none;
          color: #fff;
        }
      }
      .discord {
        &:hover {
          background: #7289da;
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }

  .content {
    border-top: 3px dashed #191919;
    margin-top: 40px;
    padding-top: 20px;

    .links {
      text-align: initial;
      .title {
        text-transform: uppercase;
        font-size: 90%;
        font-weight: 700;
        /* */
        margin-bottom: 10px;
      }
      ul {
        padding-inline-start: 0;
        color: #21ba45;
        font-size: 13px;
      }
      li {
        display: block;
        a {
          color: #21ba45;
        }
      }
      @media screen and (min-width: 480px) {
        margin-top: 20px;
        width: 30%;
      }
    }
    @media screen and (min-width: 480px) {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }

    .widget-vk {
      -ms-flex-positive: 1;
      flex-grow: 1;
      /* */
      margin-top: 20px;

      .widget-area {
        /* max-width: 300px; */
        overflow: hidden;
        /* */
        background: #fff;
        position: relative;
        left: 100%;
        transform: translate(-100%);
        @media screen and (min-width: 480px) {
          max-width: 300px;
        }

        div {
          height: 0px;
          background: none;
        }
        #vk_groups {
          iframe {
            width: 100%!important;
            max-height: 300px;
          } 
        }

      }
      @media screen and (min-width: 480px) {
        width: 30%;
      }
    }
  } 
}
.wrapper {
  max-width: 980px;
  margin: 0 auto;
  padding: 80px 20px;
  box-sizing: border-box;
}

a.logo {
  font-size: 170%!important;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 20px;
  white-space: nowrap;
  line-height: 1;
  color: #fff!important;
  text-transform: uppercase;
}
body.green-links .card:hover .name, body.green-links .colored, body.green-links .link, body.green-links a {
    color: #21ba45;
}
body .link, body a {
    text-decoration: none;
    cursor: pointer;
}

.links_textDecoration:hover {
  text-decoration: underline;
}



/* ---------- Example ---------- */

.el-footer {
  padding: 130px 0;
  text-align: center;
  background-color: #9b9b9b;
  @media (max-width: 768px) {
    padding: 60px 0;
  }
}
.footer-logo {
  display: inline-block;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
}
.footer-text {
  font-size: 18px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
</style>
