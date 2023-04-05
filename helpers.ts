export const initPhotostack = () => {
  if (typeof window !== 'undefined') {
    if (document.getElementById('photostack-3')) {
      // @ts-ignore
      new Photostack(document.getElementById('photostack-3'), {
        // any other options here,
        afterInit: function (ps: any) {
          setTimeout(function () {
            ps._open(true)
          }, 3000)
        },
        afterShowPhoto: function (ps: any) {
          setTimeout(function () {
            ps._navigate('next')
          }, 3000)
        }
      })
    }
  }
}
