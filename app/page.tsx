'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''

const day1Slots = [
  { time:'14:00', dur:'5분', tag:'도입', name:'오프닝 & 교육 안내', color:'text-warm-dim', bg:'bg-warm-dim/10', border:'border-warm-dim/20' },
  { time:'14:05', dur:'20분', tag:'사례', name:'엔터프라이즈 AI 실제 사례', color:'text-amber-600', bg:'bg-amber-50', border:'border-amber-200' },
  { time:'14:25', dur:'70분', tag:'기초체험', name:'함께 설치하고 체험하는 개발 환경 첫걸음', color:'text-d1', bg:'bg-blue-50', border:'border-blue-200', big:true },
  { time:'15:35', dur:'30분', tag:'기획실습', name:'우리 팀 업무를 프로그램으로 바꾸는 기획 실습', color:'text-emerald-600', bg:'bg-emerald-50', border:'border-emerald-200' },
  { time:'16:05', dur:'90분', tag:'팀실습', name:'팀별 맞춤 CRM 바이브코딩 실습', color:'text-d2', bg:'bg-purple-50', border:'border-purple-200', big:true },
  { time:'17:35', dur:'25분', tag:'발표', name:'팀별 초안 공유 & Day 2 준비', color:'text-red-600', bg:'bg-red-50', border:'border-red-200' },
]
const day2Slots = [
  { time:'14:00', dur:'15분', tag:'복습', name:'Day 1 복습 & 과제 점검', color:'text-warm-dim', bg:'bg-warm-dim/10', border:'border-warm-dim/20' },
  { time:'14:15', dur:'30분', tag:'기획확정', name:'팀별 CRM 기획 확정 & 프롬프트 작성', color:'text-emerald-600', bg:'bg-emerald-50', border:'border-emerald-200' },
  { time:'14:45', dur:'90분', tag:'개발①', name:'팀별 CRM 집중 개발 ①', color:'text-d2', bg:'bg-purple-50', border:'border-purple-200', big:true },
  { time:'16:15', dur:'60분', tag:'개발②', name:'팀별 CRM 집중 개발 ② + 배포', color:'text-d2', bg:'bg-purple-50', border:'border-purple-200', big:true },
  { time:'17:15', dur:'30분', tag:'발표', name:'팀별 결과물 발표 & 피드백', color:'text-red-600', bg:'bg-red-50', border:'border-red-200' },
  { time:'17:45', dur:'15분', tag:'마무리', name:'교육 마무리 & 향후 가이드', color:'text-warm-dim', bg:'bg-warm-dim/10', border:'border-warm-dim/20' },
]

const diagItems = ['VS Code 사용','터미널/명령 프롬프트','HTML/CSS 기초','엑셀 함수 (VLOOKUP 등)','데이터베이스 (테이블, SQL)','API 개념','서버/클라우드 개념','Git/GitHub 사용']

function Slot({ s, variant }: { s: any; variant: string }) {
  return (
    <div className={`flex items-center border-b border-warm-border ${s.big ? 'bg-cream' : 'bg-white'}`}>
      <div className="w-16 shrink-0 py-3 text-center text-xs text-warm-sub border-r border-warm-border font-medium">{s.time}</div>
      <div className="flex-1 flex items-center px-3 py-3 gap-2.5">
        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold shrink-0 ${s.color} ${s.bg} border ${s.border}`}>{s.tag}</span>
        <span className={`text-sm text-warm-text leading-snug ${s.big ? 'font-semibold' : ''}`}>{s.name}</span>
        <span className="ml-auto text-[10px] text-warm-dim shrink-0 font-medium">{s.dur}</span>
      </div>
    </div>
  )
}

function DayCard({ title, motto, slots, variant, color }: any) {
  return (
    <div className="flex-1 min-w-0">
      <div className={`px-4 py-3 rounded-t-xl text-white ${color}`}>
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs opacity-85 mt-0.5">{motto}</div>
      </div>
      <div className="border border-warm-border border-t-0 rounded-b-xl overflow-hidden">
        {slots.map((s: any, i: number) => <Slot key={i} s={s} variant={variant} />)}
      </div>
    </div>
  )
}

function CheckGroup({ items, values, onChange, hasOther = false, otherValue = '', onOtherChange }: any) {
  const toggle = (item: string) => onChange(values.includes(item) ? values.filter((v: string) => v !== item) : [...values, item])
  return (<div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
      {items.map((item: string) => (
        <label key={item} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-warm-border bg-white cursor-pointer text-sm text-warm-text hover:border-d1/30 transition-colors">
          <input type="checkbox" checked={values.includes(item)} onChange={() => toggle(item)} className="accent-d1" />
          {item}
        </label>
      ))}
    </div>
    {hasOther && <input value={otherValue} onChange={(e: any) => onOtherChange(e.target.value)} placeholder="기타 (직접 입력)" className="mt-1.5 w-full bg-white border border-warm-border rounded-lg px-3 py-2.5 text-sm text-warm-text outline-none focus:border-d1/50 transition-colors" />}
  </div>)
}

function RadioGroup({ items, name, value, onChange }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
      {items.map((item: string) => (
        <label key={item} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer text-sm transition-all
          ${value === item ? 'border-d1/50 bg-blue-50 text-warm-text font-medium' : 'border-warm-border bg-white text-warm-text hover:border-d1/30'}`}>
          <input type="radio" name={name} checked={value === item} onChange={() => onChange(item)} className="accent-d1" />
          {item}
        </label>
      ))}
    </div>
  )
}

function DiagTable({ values, onChange }: any) {
  const levels = ['전혀 모름', '들어봤지만 못함', '약간 할 수 있음', '능숙함']
  return (
    <div className="overflow-x-auto bg-white border border-warm-border rounded-xl p-3">
      <table className="w-full text-sm">
        <thead><tr className="text-warm-sub">
          <th className="text-left py-1.5 px-1 font-semibold text-xs">항목</th>
          {levels.map(l => <th key={l} className="text-center py-1.5 px-0.5 font-semibold text-[10px] whitespace-nowrap">{l}</th>)}
        </tr></thead>
        <tbody>{diagItems.map((item, i) => (
          <tr key={item} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
            <td className="py-2 px-1 text-warm-text text-xs">{item}</td>
            {levels.map(l => (
              <td key={l} className="text-center py-2 px-0.5">
                <input type="radio" name={`diag_${item}`} checked={values[item] === l}
                  onChange={() => onChange({ ...values, [item]: l })} className="accent-d1" />
              </td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState(''); const [team, setTeam] = useState(''); const [role, setRole] = useState('')
  const [aiFreq, setAiFreq] = useState(''); const [tools, setTools] = useState<string[]>([]); const [toolsO, setToolsO] = useState('')
  const [usage, setUsage] = useState<string[]>([]); const [usageO, setUsageO] = useState(''); const [diag, setDiag] = useState<Record<string,string>>({})
  const [codingExp, setCodingExp] = useState(''); const [vibeAware, setVibeAware] = useState('')
  const [pain, setPain] = useState(''); const [excel, setExcel] = useState('')
  const [dataT, setDataT] = useState<string[]>([]); const [dataTO, setDataTO] = useState('')
  const [learn, setLearn] = useState<string[]>([]); const [learnO, setLearnO] = useState('')
  const [build, setBuild] = useState(''); const [concern, setConcern] = useState(''); const [setup, setSetup] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !team.trim()) { setError('이름과 소속 팀을 입력해주세요.'); return }
    setError(''); setSubmitting(true)
    const payload = {
      timestamp: new Date().toISOString(), name: name.trim(), team: team.trim(), role: role.trim(),
      aiFrequency: aiFreq,
      aiTools: [...tools, toolsO ? `기타: ${toolsO}` : ''].filter(Boolean).join(', '),
      aiUsage: [...usage, usageO ? `기타: ${usageO}` : ''].filter(Boolean).join(', '),
      diagnostic: diagItems.map(item => `${item}: ${diag[item] || '미응답'}`).join(' | '),
      codingExperience: codingExp, vibeAwareness: vibeAware,
      painPoints: pain.trim(), excelWork: excel.trim(),
      dataTypes: [...dataT, dataTO ? `기타: ${dataTO}` : ''].filter(Boolean).join(', '),
      wantToLearn: [...learn, learnO ? `기타: ${learnO}` : ''].filter(Boolean).join(', '),
      wantToBuild: build.trim(), concerns: concern.trim(), setupHelp: setup.trim(),
    }
    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
      }
      setSubmitted(true); window.scrollTo({ top:0, behavior:'smooth' })
    } catch { setError('제출 중 오류가 발생했습니다.') }
    finally { setSubmitting(false) }
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-5">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-warm-text mb-3">설문 제출 완료!</h1>
        <p className="text-warm-sub mb-8">응답이 성공적으로 제출되었습니다.</p>
        <div className="bg-white border border-warm-border rounded-xl p-5 text-left space-y-3 text-sm">
          <p className="text-warm-text font-bold mb-3">사전 준비 체크리스트</p>
          {[['VS Code 설치','code.visualstudio.com'],['Node.js 설치 (LTS)','nodejs.org'],['Claude 계정 가입','claude.ai'],['Supabase 계정 가입','supabase.com'],['GitHub 계정 가입','github.com'],['Chrome 브라우저 업데이트','']].map(([item,url]) => (
            <div key={item} className="flex items-center gap-2 text-warm-text">
              <div className="w-5 h-5 rounded border border-warm-border shrink-0" />
              <span>{item}</span>
              {url && <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="text-d1 text-xs ml-auto hover:underline">{url}</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const inputCls = "w-full bg-white border border-warm-border rounded-lg px-3.5 py-2.5 text-sm text-warm-text outline-none focus:border-d1/50 transition-colors"

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-white border-b border-warm-border">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-10 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img src="/facade-logo.png" alt="FACADE PATTERN" className="h-9 object-contain" />
            <div className="w-px h-8 bg-warm-border" />
            <img src="/p404-logo.jpg" alt="PROJECT 404" className="h-9 object-contain" />
          </div>
          <div className="inline-flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 text-emerald-600 font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            수강생 모집 중 — 사전 설문 진행 중
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-warm-text leading-tight mb-3">
            AI/AX 실전 클로드코드<br />
            <span className="text-d1">바이브코딩</span> 활용 교육
          </h1>
          <p className="text-lg text-warm-sub mb-7">우리 팀만의 업무 CRM, 바이브코딩으로 직접 만들기</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm mb-8">
            <span className="bg-blue-50 text-d1 px-4 py-1.5 rounded-lg font-semibold border border-blue-200">Day 1 — 7/9(수) 14:00~18:00</span>
            <span className="bg-purple-50 text-d2 px-4 py-1.5 rounded-lg font-semibold border border-purple-200">Day 2 — 7/11(금) 14:00~18:00</span>
            <span className="bg-cream text-warm-sub px-4 py-1.5 rounded-lg font-medium border border-warm-border">총 8시간 (4시간 × 2일)</span>
          </div>
          <a href="#survey" className="inline-flex items-center gap-2 bg-d1 hover:bg-d1/90 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md shadow-d1/20">
            사전 설문 참여하기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </a>
        </div>
      </section>

      {/* Timetable */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl font-extrabold text-warm-text mb-1.5 text-center">교육 타임테이블</h2>
        <p className="text-warm-sub text-center mb-7 text-sm">Day 1은 기초 체험과 첫 실습, Day 2는 팀별 프로젝트에 올인합니다.</p>
        <div className="flex flex-col lg:flex-row gap-4">
          <DayCard title='Day 1 — 7/9(수)' motto='"함께 배우고, 함께 만들기 시작"' slots={day1Slots} variant="d1" color="bg-d1" />
          <DayCard title='Day 2 — 7/11(금)' motto='"우리 팀 CRM, 오늘 만들어서 오늘 쓴다"' slots={day2Slots} variant="d2" color="bg-d2" />
        </div>
        <div className="mt-6 bg-white border border-warm-border rounded-xl p-5">
          <h3 className="text-sm font-bold text-warm-text mb-3">시간 배분 비교</h3>
          {[{l:'실전 사례',a:25,b:0},{l:'함께하는 기초',a:100,b:15},{l:'프로젝트 실습',a:90,b:180},{l:'발표/마무리',a:25,b:45}].map(r => (
            <div key={r.l} className="flex items-center gap-3 mb-2 text-xs">
              <span className="w-20 text-warm-sub shrink-0 font-medium">{r.l}</span>
              <div className="flex-1 flex items-center gap-1 h-4">
                {r.a > 0 && <div className="bg-d1/70 rounded h-full" style={{ width:`${(r.a/280)*100}%` }} />}
                {r.b > 0 && <div className="bg-d2/70 rounded h-full" style={{ width:`${(r.b/280)*100}%` }} />}
              </div>
              <span className="w-20 text-right text-warm-dim shrink-0">{r.a}분 / {r.b}분</span>
            </div>
          ))}
          <div className="flex gap-5 mt-3 text-xs text-warm-dim">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-d1/70" /> Day 1</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-d2/70" /> Day 2</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid sm:grid-cols-3 gap-3">
          {[{i:'🎯',t:'코드 몰라도 OK',d:'AI와 대화하며 만드는 바이브코딩. 설치부터 함께하니 걱정 마세요'},{i:'🛠️',t:'교육 중 결과물 완성',d:'교육 종료 시 팀별 실무용 CRM이 만들어집니다. 바로 사용 가능'},{i:'💡',t:'기획부터 배포까지',d:'기획 → 설계 → 개발 → 배포, 전체 사이클을 하루만에 체험'}].map(c => (
            <div key={c.t} className="bg-white border border-warm-border rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="text-2xl mb-2.5">{c.i}</div>
              <h3 className="text-warm-text font-bold text-sm mb-1.5">{c.t}</h3>
              <p className="text-warm-sub text-xs leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Survey */}
      <section id="survey" className="max-w-2xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-xl font-extrabold text-warm-text mb-1.5">사전 설문조사</h2>
          <p className="text-warm-sub text-sm">교육 커리큘럼을 수강생 맞춤으로 조정하기 위한 설문입니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Part 1 */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-emerald-600 tracking-wider">① 기본 정보</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className="block text-sm text-warm-sub mb-1.5">이름 <span className="text-red-500">*</span></label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="홍길동" className={inputCls} /></div>
              <div><label className="block text-sm text-warm-sub mb-1.5">소속 팀 <span className="text-red-500">*</span></label><input type="text" value={team} onChange={e => setTeam(e.target.value)} placeholder="마케팅팀" className={inputCls} /></div>
            </div>
            <div><label className="block text-sm text-warm-sub mb-1.5">담당 업무</label><input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="콘텐츠 기획 및 SNS 운영" className={inputCls} /></div>
          </div>

          {/* Part 2 */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-d1 tracking-wider">② AI 도구 사용 현황</div>
            <div><label className="block text-sm text-warm-sub mb-2">AI 도구 사용 빈도</label><RadioGroup name="freq" items={['거의 매일','주 2~3회','가끔 (월 수회)','거의 안 씀']} value={aiFreq} onChange={setAiFreq} /></div>
            <div><label className="block text-sm text-warm-sub mb-2">사용 중인 AI 도구 (복수 선택)</label><CheckGroup items={['ChatGPT','Claude','Claude Cowork','Gemini','Copilot']} values={tools} onChange={setTools} hasOther otherValue={toolsO} onOtherChange={setToolsO} /></div>
            <div><label className="block text-sm text-warm-sub mb-2">AI 활용 용도 (복수 선택)</label><CheckGroup items={['문서 작성/교정','데이터 분석','아이디어 브레인스토밍','이메일/메시지 작성','업무 자동화','코드 작성','번역']} values={usage} onChange={setUsage} hasOther otherValue={usageO} onOtherChange={setUsageO} /></div>
          </div>

          {/* Part 3 */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-amber-600 tracking-wider">③ 기술 역량 자가진단</div>
            <div><label className="block text-sm text-warm-sub mb-2">항목별 수준 체크</label><DiagTable values={diag} onChange={setDiag} /></div>
            <div><label className="block text-sm text-warm-sub mb-2">코딩/프로그래밍 경험</label><RadioGroup name="coding" items={['전혀 없음','AI로 간단한 코드 만들어봄','독학/강의로 기초 배워봄','업무에서 스크립트 사용해봄']} value={codingExp} onChange={setCodingExp} /></div>
            <div><label className="block text-sm text-warm-sub mb-2">바이브코딩 인지도</label><RadioGroup name="vibe" items={['처음 듣는다','들어봤지만 안 해봄','시도했지만 실패','간단한 것 만들어봄']} value={vibeAware} onChange={setVibeAware} /></div>
          </div>

          {/* Part 4 */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-red-600 tracking-wider">④ 업무 Pain Point</div>
            <div><label className="block text-sm text-warm-sub mb-1.5">가장 비효율적인 업무 프로세스 (최대 3개)</label><textarea value={pain} onChange={e => setPain(e.target.value)} rows={3} placeholder="예: 주간보고를 매번 수동으로 엑셀에 정리..." className={`${inputCls} resize-none`} /></div>
            <div><label className="block text-sm text-warm-sub mb-1.5">전용 프로그램이 필요한 업무</label><textarea value={excel} onChange={e => setExcel(e.target.value)} rows={2} placeholder="예: 고객 문의 이력 관리, 재고 트래킹..." className={`${inputCls} resize-none`} /></div>
            <div><label className="block text-sm text-warm-sub mb-2">관리하는 데이터 유형 (복수 선택)</label><CheckGroup items={['고객/거래처','프로젝트 현황','재고/자산','매출/비용','일정/스케줄','인사/근태','문서/계약']} values={dataT} onChange={setDataT} hasOther otherValue={dataTO} onOtherChange={setDataTO} /></div>
          </div>

          {/* Part 5 */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-d2 tracking-wider">⑤ 교육 기대사항</div>
            <div><label className="block text-sm text-warm-sub mb-2">배우고 싶은 것 (복수 선택)</label><CheckGroup items={['바이브코딩 원리','클로드 코드 사용법','업무용 CRM 제작','데이터베이스 설계','프롬프트 작성법','배포 방법']} values={learn} onChange={setLearn} hasOther otherValue={learnO} onOtherChange={setLearnO} /></div>
            <div><label className="block text-sm text-warm-sub mb-1.5">만들어보고 싶은 것</label><input type="text" value={build} onChange={e => setBuild(e.target.value)} placeholder="예: 우리 팀 프로젝트 관리 대시보드" className={inputCls} /></div>
            <div><label className="block text-sm text-warm-sub mb-1.5">걱정/우려 사항 (선택)</label><textarea value={concern} onChange={e => setConcern(e.target.value)} rows={2} placeholder="자유롭게 적어주세요" className={`${inputCls} resize-none`} /></div>
            <div><label className="block text-sm text-warm-sub mb-1.5">사전 준비에서 도움 필요한 부분 (선택)</label><input type="text" value={setup} onChange={e => setSetup(e.target.value)} placeholder="예: Node.js 설치 방법을 모르겠어요" className={inputCls} /></div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>}

          <button type="submit" disabled={submitting}
            className="w-full bg-d1 hover:bg-d1/90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-d1/15">
            {submitting ? '제출 중...' : '설문 제출하기'}
          </button>
          <p className="text-center text-warm-dim text-xs -mt-4">제출된 응답은 교육 커리큘럼 조정에만 활용됩니다.</p>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-warm-border py-6 text-center text-xs text-warm-dim">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img src="/facade-logo.png" alt="FACADE PATTERN" className="h-4 opacity-50" />
          <span className="text-warm-border">×</span>
          <img src="/p404-logo.jpg" alt="PROJECT 404" className="h-4 opacity-50" />
        </div>
        <p>FACADE PATTERN × PROJECT 404</p>
      </footer>
    </main>
  )
}
