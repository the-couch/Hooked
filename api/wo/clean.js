module.exports = (parsed) => {
  // Let's clean that data up babes
  let cleanObject = {}
  let cleanModules = []
  cleanObject = Object.assign({}, cleanObject, {
    title: parsed.title,
    slug: parsed.slug
  })

  parsed.modules.forEach((module) => {
    // console.log('module spaghetti', module)
    let cleanModule = {}
    let productcta = []
    let icons = []
    let links = []
    let values = []
    let singleRows = []
    let highlights = []
    let slides = []
    let logos = []
    let products = []
    switch (module.sys.contentType.sys.id) {
      case 'moduleProductGrid':
        module.fields.products.forEach((product) => {
          let images = []
          let variants = []
          product.fields.image.forEach((image) => {
            let cleanImage = {
              fields: {
                file: {
                  url: image.fields.file.url
                }
              }
            }
            images.push(cleanImage)
          })
          product.fields.variants.forEach((variant) => {
            let cleanVariant = {
              fields: {
                variantDiscountedPrice: variant.fields.variantDiscountedPrice,
                variantPrice: variant.fields.variantPrice,
                variantCLPImage: variant.fields.clpLandingImage,
                variantCLPHover: variant.fields.clpLandingHoverImage,
                material: variant.fields.material
              }
            }
            variants.push(cleanVariant)
          })
          let cleanProduct = {
            slug: product.fields.slug,
            productName: product.fields.productName,
            productShortDescription: product.fields.productShortDescription,
            collectionHover: product.fields.collectionHover,
            productSubheader: product.fields.productSubheader,
            image: images,
            variants: variants
          }
          console.log('this is the clean product?', cleanProduct)
          products.push(cleanProduct)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleProductGrid'
              }
            }
          },
          fields: {
            slug: module.fields.slug,
            gridType: module.fields.gridType,
            videoModule: module.fields.videoModule,
            products: products
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleLargeHero':
        let images = []
        module.fields.images.forEach((image) => {
          let cleanImage = {
            fields: image.fields
          }
          images.push(cleanImage)
        })
        console.log('module.fields', module.fields)
        if (module.fields.productcta) {
          module.fields.productcta.forEach((cta) => {
            let cleanCta = {
              sys: {
                contentType: {
                  sys: {
                    id: cta.sys.contentType.sys.id
                  }
                }
              },
              fields: {
                slug: cta.fields.slug,
                productName: cta.fields.productName,
                ctaTitle: cta.fields.ctaTitle
              }
            }
            productcta.push(cleanCta)
          })
        }
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleLargeHero'
              }
            }
          },
          fields: {
            images: images,
            title: module.fields.title,
            productcta: productcta,
            alignment: module.fields.alignment
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleMediumHero':
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleMediumHero'
              }
            }
          },
          fields: {
            image: {
              fields: {
                file: {
                  url: module.fields.image.fields.file.url
                }
              }
            },
            title: module.fields.title
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleCta':
        let linkObject = null
        if (module.fields.link) {
          linkObject = Object.assign({}, linkObject, {
            sys: {
              contentType: {
                sys: {
                  id: module.fields.link.sys.contentType.sys.id
                }
              }
            },
            fields: {
              slug: module.fields.link.fields.slug
            }
          })
        }
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleCta'
              }
            }
          },
          fields: {
            content: module.fields.content,
            textStyle: module.fields.textStyle,
            alignment: module.fields.alignment,
            backgroundImage: {
              fields: {
                file: {
                  url: module.fields.backgroundImage.fields.file.url
                }
              }
            },
            linkText: module.fields.linkText,
            link: linkObject,
            buttonVisibility: module.fields.buttonVisibility
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleStopMotion':
        let stopimages = []
        module.fields.slideshowImages.forEach((image) => {
          let cleanImage = {
            fields: image.fields
          }
          stopimages.push(cleanImage)
        })
        module.fields.productIcons.forEach((icon) => {
          let cleanIcon = {
            fields: {
              title: icon.fields.title,
              whiteIcon: {
                fields: {
                  file: {
                    url: icon.fields.whiteIcon.fields.file.url
                  }
                }
              }
            }
          }
          icons.push(cleanIcon)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleStopMotion'
              }
            }
          },
          fields: {
            productName: module.fields.productName,
            productDescription: module.fields.productDescription,
            subHeader: module.fields.subHeader,
            productLink: {
              fields: {
                slug: module.fields.productLink.fields.slug
              }
            },
            slideshowImages: stopimages,
            alignment: module.fields.alignment,
            productIcons: icons,
            stopMotionImage: {
              fields: {
                file: {
                  url: module.fields.stopMotionImage.fields.file.url
                }
              }
            },
            videoUrl: module.fields.videoUrl,
            stopMotionVideo: module.fields.stopMotionVideo
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleCoreValues':
        module.fields.value.forEach((val) => {
          let cleanValue = {
            fields: {
              content: val.fields.content,
              header: val.fields.header,
              icon: {
                fields: {
                  blueIcon: {
                    fields: {
                      file: {
                        url: val.fields.icon.fields.blueIcon.fields.file.url
                      }
                    }
                  }
                }
              }
            }
          }
          icons.push(cleanValue)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleCoreValues'
              }
            }
          },
          fields: {
            title: module.fields.title,
            value: icons
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleVideoText':
        module.fields.singleRow.forEach((row) => {
          let cleanSingleRow = {
            fields: {
              imageFallback: {
                fields: {
                  file: {
                    url: row.fields.imageFallback ? row.fields.imageFallback.fields.file.url : null
                  }
                }
              },
              video: row.fields.video,
              videoUrl: row.fields.videoUrl,
              text: row.fields.text,
              alignment: row.fields.alignment,
              icon: {
                fields: {
                  blueIcon: {
                    fields: {
                      file: {
                        url: row.fields.icon ? row.fields.icon.fields.blueIcon.fields.file.url : null
                      }
                    }
                  }
                }
              }
            }
          }
          singleRows.push(cleanSingleRow)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleVideoText'
              }
            }
          },
          fields: {
            helpfulTitle: module.fields.helpfulTitle,
            singleRow: singleRows
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleFeatureHighlights':
        module.fields.highlight.forEach((highlight) => {
          let cleanHighlight = {
            fields: {
              image: {
                fields: {
                  file: {
                    url: highlight.fields.image.fields.file.url
                  }
                }
              },
              video: highlight.fields.video,
              title: highlight.fields.title,
              description: highlight.fields.description
            }
          }
          highlights.push(cleanHighlight)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleFeatureHighlights'
              }
            }
          },
          fields: {
            helpfulTitle: module.fields.helpfulTitle,
            featureHighlights: highlights
          }
        })
        cleanModules.push(cleanModule)
        break;
      case 'moduleSlideshow':
        if (module.fields.companyLogo) {
          module.fields.companyLogo.forEach((logo) => {
            let cleanCompany = {
              fields: {
                file: {
                  url: logo.fields.file.url
                }
              }
            }
            logos.push(cleanCompany)
          })
        }
        module.fields.slide.forEach((single) => {
          let cleanSlide = {
            fields: {
              productLink: {
                fields: {
                  slug: single.fields.productLink.fields.slug,
                  productName: single.fields.productLink.fields.productName
                }
              },
              quote: single.fields.quote,
              personName: single.fields.personName
            }
          }
          slides.push(cleanSlide)
        })
        cleanModule = Object.assign({}, cleanModule, {
          sys: {
            contentType: {
              sys: {
                id: 'moduleSlideshow'
              }
            }
          },
          fields: {
            helpfulText: module.fields.helpfulText,
            slide: slides,
            companyLogo: logos
          }
        })
        cleanModules.push(cleanModule)
        break;
    }
  })
  cleanObject = Object.assign({}, cleanObject, {
    modules: cleanModules
  })
  return cleanObject
}