import Dashboard from '@pages/Dashboard';
import InteractionStalk from '@pages/Facebook/InteractionStalk';
import FriendsRemover from '@pages/Facebook/FriendsRemover';
import LikedPageStalk from '@pages/Facebook/LikedPageStalk';
import FriendRequest from '@pages/Facebook/FriendRequest';

const routers = [
    {
        path: '/',
        Component: Dashboard,
        index: true,
    },
    {
        path: '/facebook/interaction-scan',
        Component: InteractionStalk,
    },
    {
        path: '/facebook/friends-remover',
        Component: FriendsRemover,
    },
    {
        path: '/facebook/liked-page-stalk',
        Component: LikedPageStalk,
    },
    {
        path: '/facebook/friend-request',
        Component: FriendRequest,
    },
];

export default routers;
