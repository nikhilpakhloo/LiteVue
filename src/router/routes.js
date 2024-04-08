const Splash = () => import('../views/common/splash.vue').then(m => m.default || m);
const Auth = () => import('../views/common/auth.vue').then(m => m.default || m);
const Main = () => import('../views/dive/index.vue').then(m => m.default || m);
const Camera = () => import('../views/dive/camera.vue').then(m => m.default || m);
const Terms = () => import('../views/common/terms.vue').then(m => m.default || m);
const Privacy = () => import('../views/common/privacy.vue').then(m => m.default || m);
const License = () => import('../views/common/license.vue').then(m => m.default || m);
const Device = () => import('../views/device/index.vue').then(m => m.default || m);
const Scan = () => import('../views/device/scan.vue').then(m => m.default || m);
const Gallery = () => import('../views/gallery/index.vue').then(m => m.default || m);
const Collection = () => import('../views/coll/index.vue').then(m => m.default || m);
const GallMore = () => import('../views/gallery/more.vue').then(m => m.default || m);
const GallList = () => import('../views/gallery/list.vue').then(m => m.default || m);
const CollMore = () => import('../views/coll/more.vue').then(m => m.default || m);
const CollList = () => import('../views/coll/list.vue').then(m => m.default || m);
const CollReg = () => import('../views/coll/reg.vue').then(m => m.default || m);
const CollEdit = () => import('../views/coll/edit.vue').then(m => m.default || m);
const CollPic = () => import('../views/coll/pics.vue').then(m => m.default || m);
const FilterPic = () => import('../views/gallery/pics.vue').then(m => m.default || m);
const Mypage = () => import('../views/user/index.vue').then(m => m.default || m);
const Setting = () => import('../views/setting/index.vue').then(m => m.default || m);
const Service = () => import('../views/setting/service.vue').then(m => m.default || m);
const Appinfo = () => import('../views/setting/appinfo.vue').then(m => m.default || m);
const Tutorial = () => import('../views/setting/tutorial.vue').then(m => m.default || m);
const Manual = () => import('../views/setting/manual.vue').then(m => m.default || m);
const Media = () => import('../views/media/index.vue').then(m => m.default || m);
const Notice = () => import('../views/notice/index.vue').then(m => m.default || m);
const NoticeDetail = () => import('../views/notice/detail.vue').then(m => m.default || m);
const Contract = () => import('../views/contract/reg.vue').then(m => m.default || m);
const Test = () => import('../views/test.vue').then(m => m.default || m);
export default [
    {
        path: '',
        name: 'splash',
        component: Splash,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        props: true,
        meta: { footer: true }
    },
    {
        path: '/camera',
        name: 'camera',
        component: Camera,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/terms',
        name: 'terms',
        component: Terms,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/license',
        name: 'license',
        component: License,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: Privacy,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/device',
        name: 'device',
        component: Device,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/scan',
        name: 'scan',
        component: Scan,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/filter',
        name: 'filterPic',
        component: FilterPic,
        props: true,
        meta: { footer: true }
    },
    {
        path: '/logbook/gallery',
        name: 'gallery',
        component: Gallery,
        props: true,
        meta: { footer: true }
    },
    {
        path: '/logbook/gallery/more',
        name: 'gallMore',
        component: GallMore,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/gallery/list/:seq',
        name: 'gallList',
        component: GallList,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/coll',
        name: 'coll',
        component: Collection,
        props: true,
        meta: { footer: true }
    },
    {
        path: '/logbook/coll/more',
        name: 'collMore',
        component: CollMore,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/coll/list/:seq',
        name: 'collList',
        component: CollList,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/coll/reg',
        name: 'collReg',
        component: CollReg,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/coll/edit/:seq',
        name: 'collEdit',
        component: CollEdit,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/logbook/coll/pics',
        name: 'collPic',
        component: CollPic,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/media/:seq',
        name: 'media',
        component: Media,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: Mypage,
        props: true,
        meta: { footer: true }
    },
    {
        path: '/setting',
        name: 'setting',
        component: Setting,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/service',
        name: 'service',
        component: Service,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/appinfo',
        name: 'appinfo',
        component: Appinfo,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/manual',
        name: 'manual',
        component: Manual,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/tutorial',
        name: 'tutorial',
        component: Tutorial,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/notice',
        name: 'notice',
        component: Notice,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/notice/detail',
        name: 'noticeDetail',
        component: NoticeDetail,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/contract',
        name: 'contract',
        component: Contract,
        props: true,
        meta: { footer: false }
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
        props: true,
        meta: { footer: false }
    },
    {
        path: '*',
        redirect: '/',
    },
]