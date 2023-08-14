import { useSelector } from 'react-redux'
import { Input, TextArea } from './index'

const ArticleForm = props => {
	const {isLoading} = useSelector(state => state.article)
	const {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	} = props
	return (
		<form onSubmit={formSubmit}>
			<div className='mb-3 '>
				<label htmlFor='exampleFormControlInput1' className='form-label'>
					Article Title
				</label>
				<Input label={'Title'} state={title} setState={setTitle} />
			</div>
			<div className='mb-3'>
				<label htmlFor='exampleFormControlTextarea1' className='form-label'>
					Article description
				</label>
				<TextArea
					label={'Description'}
					height={100}
					state={description}
					setState={setDescription}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='exampleFormControlTextarea1' className='form-label'>
					Article body
				</label>
				<TextArea label={'Body'} height={200} state={body} setState={setBody} />
			</div>
			<button className='btn btn-dark w-100 py-2 mt-2' type='submit'>
				{isLoading ? 'Loading...' : 'Create article'}
			</button>
		</form>
	)
}

export default ArticleForm
