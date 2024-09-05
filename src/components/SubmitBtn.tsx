import { useNavigation } from "react-router-dom"

const SubmitBtn = ({ text }: { text: string }) => {

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <button type="submit" className="btn btn-primary btn-block uppercase">{isSubmitting ? <><span className="loading loading-spinner"></span>submitting...</> : text || 'submit'}
    </button>
  )
}

export default SubmitBtn