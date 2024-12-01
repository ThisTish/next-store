'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from '../ui/toggle'
import { BoldIcon, ItalicIcon, ListOrderedIcon, Strikethrough, StrikethroughIcon } from 'lucide-react'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { useFormContext } from 'react-hook-form'
import Placeholder from '@tiptap/extension-placeholder'


const Tiptap = ({ val }: { val: string }) => {

	const { setValue } = useFormContext()

	const editor = useEditor({
		extensions: [
			Placeholder.configure({
				placeholder: 'Product description...',
				emptyNodeClass: "first:before:text-muted-foreground first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none"
			}),
			StarterKit.configure({
				orderedList: {
					HTMLAttributes: {
						class: 'list-decimal pl-4'
					}
				},
				bulletList: {
					HTMLAttributes: {
						class: 'list-disc pl-4'
					}
				}
			})
		],
		onUpdate: ({ editor }) => {
			// sanitze tiptap
			const content = editor.getHTML()
			setValue('description', content, {
				shouldValidate: true,
				shouldDirty: true
			})
		},
		editorProps: {
			attributes: {
				class: "min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
			}
		},
		content: val,
	})

	return (
		<div className='flex flex-col gap-1'>
			{editor && (
				<div className='border border-input rounded-md'>
					<Toggle
						size={'sm'}
						pressed={editor.isActive('bold')}
						onPressedChange={() => editor.chain().focus().toggleBold().run()}
					>
						<BoldIcon />
					</Toggle>
					<Toggle
						size={'sm'}
						pressed={editor.isActive('italic')}
						onPressedChange={() => editor.chain().focus().toggleItalic().run()}
					>
						<ItalicIcon />
					</Toggle>
					<Toggle
						size={'sm'}
						pressed={editor.isActive('strike')}
						onPressedChange={() => editor.chain().focus().toggleStrike().run()}
					>
						<StrikethroughIcon />
					</Toggle>
					<Toggle
						size={'sm'}
						pressed={editor.isActive('orderList')}
						onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
					>
						<ListOrderedIcon />
					</Toggle>
					<Toggle
						size={'sm'}
						pressed={editor.isActive('bulletList')}
						onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
					>
						<ListBulletIcon />
					</Toggle>
				</div>
			)}
			<EditorContent editor={editor} />
		</div>
	)
}

export default Tiptap
