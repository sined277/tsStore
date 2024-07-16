import ContentLoader from "react-content-loader"
import React from "react"
const PizzaSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={260}
    height={500}
    viewBox="0 0 260 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="110" r="104" /> 
    <rect x="21" y="228" rx="10" ry="10" width="200" height="42" /> 
    <rect x="21" y="281" rx="10" ry="10" width="200" height="54" /> 
    <rect x="104" y="355" rx="10" ry="10" width="118" height="33" /> 
    <rect x="21" y="355" rx="10" ry="10" width="60" height="33" />
  </ContentLoader>
)

export default PizzaSkeleton

