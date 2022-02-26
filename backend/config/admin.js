module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bbb6a8240f81bdec00a53ec123ee73c8'),
  },
});
