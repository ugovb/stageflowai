import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ChatContainer } from '@/components/chat/ChatContainer'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col bg-zinc-50 dark:bg-black">
      <ChatContainer />
    </div>
  )
}
