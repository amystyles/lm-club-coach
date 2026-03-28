import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { KeyElement } from '@/data/types';
import { instructors, KEY_ELEMENT_LABELS } from '@/data/mock-data';

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

interface CRCState {
  instructorId: string;
  keyElement: KeyElement | '';
  connect: string;
  recommend: string;
  commend: string;
  currentStep: 1 | 2 | 3 | 4;
}

interface GROWState {
  instructorId: string;
  goal: string;
  reality: string;
  options: string;
  will: string;
  currentStep: 1 | 2 | 3 | 4;
}

const StepIndicator: React.FC<{ letter: string; label: string; isActive: boolean; isComplete: boolean }> = ({
  letter,
  label,
  isActive,
  isComplete,
}) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-600';

  if (isComplete) {
    bgColor = 'bg-green-500';
    textColor = 'text-white';
  } else if (isActive) {
    bgColor = 'bg-lm-dark';
    textColor = 'text-white';
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <div className={`${bgColor} ${textColor} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold`}>
        {letter}
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
};

export default function FeedbackBuilder() {
  const [crcState, setCrcState] = useState<CRCState>({
    instructorId: '',
    keyElement: '',
    connect: '',
    recommend: '',
    commend: '',
    currentStep: 1,
  });

  const [growState, setGrowState] = useState<GROWState>({
    instructorId: '',
    goal: '',
    reality: '',
    options: '',
    will: '',
    currentStep: 1,
  });

  // CRC Handlers
  const handleCRCInstructorChange = (id: string) => {
    setCrcState((prev) => ({ ...prev, instructorId: id }));
  };

  const handleCRCKeyElementChange = (element: KeyElement) => {
    setCrcState((prev) => ({ ...prev, keyElement: element }));
  };

  const handleCRCNext = () => {
    if (crcState.currentStep < 4) {
      setCrcState((prev) => ({ ...prev, currentStep: (prev.currentStep + 1) as 1 | 2 | 3 | 4 }));
    }
  };

  const handleCRCPrev = () => {
    if (crcState.currentStep > 1) {
      setCrcState((prev) => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 | 4 }));
    }
  };

  const crcInstructor = instructors.find((i) => i.id === crcState.instructorId);

  const crcCanProceed =
    crcState.currentStep === 1
      ? crcState.instructorId && crcState.keyElement
      : crcState.currentStep === 2
        ? crcState.connect.trim().length > 0
        : crcState.currentStep === 3
          ? crcState.recommend.trim().length > 0
          : crcState.commend.trim().length > 0;

  // GROW Handlers
  const handleGROWInstructorChange = (id: string) => {
    setGrowState((prev) => ({ ...prev, instructorId: id }));
  };

  const handleGROWNext = () => {
    if (growState.currentStep < 4) {
      setGrowState((prev) => ({ ...prev, currentStep: (prev.currentStep + 1) as 1 | 2 | 3 | 4 }));
    }
  };

  const handleGROWPrev = () => {
    if (growState.currentStep > 1) {
      setGrowState((prev) => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 | 4 }));
    }
  };

  const growInstructor = instructors.find((i) => i.id === growState.instructorId);

  const growCanProceed =
    growState.currentStep === 1
      ? growState.instructorId
      : growState.currentStep === 2
        ? growState.goal.trim().length > 0
        : growState.currentStep === 3
          ? growState.reality.trim().length > 0
          : growState.options.trim().length > 0;

  const handleCopyCRC = () => {
    const text = `CONNECT:\n${crcState.connect}\n\nRECOMMEND:\n${crcState.recommend}\n\nCOMMEND:\n${crcState.commend}`;
    navigator.clipboard.writeText(text);
  };

  const handleCopyGROW = () => {
    const text = `GOAL:\n${growState.goal}\n\nREALITY:\n${growState.reality}\n\nOPTIONS:\n${growState.options}\n\nWILL:\n${growState.will}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Feedback Builder</h1>
          <p className="text-gray-600 mt-2">Turn observations into feedback instructors can use</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="crc" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-8">
            <TabsTrigger value="crc">CRC Method</TabsTrigger>
            <TabsTrigger value="grow">GROW Model</TabsTrigger>
          </TabsList>

          {/* CRC Tab */}
          <TabsContent value="crc">
            <div className="grid grid-cols-3 gap-8">
              {/* CRC Steps */}
              <div className="col-span-2">
                <Card className="p-8">
                  {/* Step 1: Select */}
                  {crcState.currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: Select Instructor & Key Element</h2>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="crc-instructor" className="text-sm font-medium mb-2 block">
                              Instructor
                            </Label>
                            <Select value={crcState.instructorId} onValueChange={handleCRCInstructorChange}>
                              <SelectTrigger id="crc-instructor">
                                <SelectValue placeholder="Select instructor" />
                              </SelectTrigger>
                              <SelectContent>
                                {instructors.map((inst) => (
                                  <SelectItem key={inst.id} value={inst.id}>
                                    {inst.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="crc-element" className="text-sm font-medium mb-2 block">
                              Key Element Focus
                            </Label>
                            <Select value={crcState.keyElement} onValueChange={(val) => handleCRCKeyElementChange(val as KeyElement)}>
                              <SelectTrigger id="crc-element">
                                <SelectValue placeholder="Select key element" />
                              </SelectTrigger>
                              <SelectContent>
                                {KEY_ELEMENTS.map((element) => (
                                  <SelectItem key={element} value={element}>
                                    {KEY_ELEMENT_LABELS[element]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Connect */}
                  {crcState.currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: CONNECT</h2>
                        <p className="text-sm text-gray-700 mb-4 bg-lm-subtle p-3 rounded">
                          Eye contact, name, genuine observation of something working. Not a compliment — evidence.
                        </p>
                        <Textarea
                          placeholder="Write your connection statement..."
                          value={crcState.connect}
                          onChange={(e) => setCrcState((prev) => ({ ...prev, connect: e.target.value }))}
                          className="h-32 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Recommend */}
                  {crcState.currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 3: RECOMMEND</h2>
                        <p className="text-sm text-gray-700 mb-4 bg-orange-50 p-3 rounded">
                          One development priority. Specific. Tied to a KE. A concrete next step with a date.
                        </p>
                        <Textarea
                          placeholder="Write your recommendation..."
                          value={crcState.recommend}
                          onChange={(e) => setCrcState((prev) => ({ ...prev, recommend: e.target.value }))}
                          className="h-32 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Commend */}
                  {crcState.currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 4: COMMEND</h2>
                        <p className="text-sm text-gray-700 mb-4 bg-green-50 p-3 rounded">
                          Affirm the strength and the instructor's capacity to grow. Based on what you observed.
                        </p>
                        <Textarea
                          placeholder="Write your commendation..."
                          value={crcState.commend}
                          onChange={(e) => setCrcState((prev) => ({ ...prev, commend: e.target.value }))}
                          className="h-32 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Navigation */}
                  <div className="flex gap-3 justify-between">
                    <Button
                      variant="outline"
                      onClick={handleCRCPrev}
                      disabled={crcState.currentStep === 1}
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-gray-600">
                      Step {crcState.currentStep} of 4
                    </div>
                    <Button
                      onClick={handleCRCNext}
                      disabled={crcState.currentStep === 4 || !crcCanProceed}
                      className="bg-lm-dark hover:bg-lm-dark/90 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </Card>
              </div>

              {/* CRC Preview */}
              <div>
                <div className="sticky top-8">
                  <Card className="p-6 bg-white border-2 border-lm-green/30">
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm">Preview</h3>

                    {crcInstructor && crcState.keyElement && (
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-600">For</p>
                          <p className="font-semibold text-sm">{crcInstructor.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Focus</p>
                          <Badge variant="secondary" className="text-xs">
                            {KEY_ELEMENT_LABELS[crcState.keyElement]}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <Separator className="my-4" />

                    <div className="space-y-4 text-xs">
                      {crcState.connect && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">CONNECT</p>
                          <p className="text-gray-700 line-clamp-3">{crcState.connect}</p>
                        </div>
                      )}
                      {crcState.recommend && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">RECOMMEND</p>
                          <p className="text-gray-700 line-clamp-3">{crcState.recommend}</p>
                        </div>
                      )}
                      {crcState.commend && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">COMMEND</p>
                          <p className="text-gray-700 line-clamp-3">{crcState.commend}</p>
                        </div>
                      )}
                    </div>

                    {crcState.currentStep === 4 && crcState.connect && crcState.recommend && crcState.commend && (
                      <>
                        <Separator className="my-4" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopyCRC}
                          className="w-full gap-2 text-xs"
                        >
                          <Copy className="w-3 h-3" />
                          Copy Feedback
                        </Button>
                      </>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* GROW Tab */}
          <TabsContent value="grow">
            <div className="grid grid-cols-3 gap-8">
              {/* GROW Steps */}
              <div className="col-span-2">
                <Card className="p-8">
                  {/* Step 1: Select Instructor */}
                  {growState.currentStep === 1 && (
                    <div className="space-y-6">
                      <StepIndicator letter="G" label="GOAL" isActive={true} isComplete={false} />
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Instructor</h2>
                      <div>
                        <Label htmlFor="grow-instructor" className="text-sm font-medium mb-2 block">
                          Instructor
                        </Label>
                        <Select value={growState.instructorId} onValueChange={handleGROWInstructorChange}>
                          <SelectTrigger id="grow-instructor">
                            <SelectValue placeholder="Select instructor" />
                          </SelectTrigger>
                          <SelectContent>
                            {instructors.map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>
                                {inst.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Goal */}
                  {growState.currentStep === 2 && (
                    <div className="space-y-6">
                      <StepIndicator letter="G" label="GOAL" isActive={true} isComplete={false} />
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">GOAL</h2>
                      <p className="text-sm text-gray-700 mb-4 bg-lm-subtle p-3 rounded">
                        Where do you want to be in the LMQ by end of quarter?
                      </p>
                      <Textarea
                        placeholder="What is your goal?"
                        value={growState.goal}
                        onChange={(e) => setGrowState((prev) => ({ ...prev, goal: e.target.value }))}
                        className="h-32 text-sm"
                      />
                    </div>
                  )}

                  {/* Step 3: Reality */}
                  {growState.currentStep === 3 && (
                    <div className="space-y-6">
                      <StepIndicator letter="R" label="REALITY" isActive={true} isComplete={growState.goal.length > 0} />
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">REALITY</h2>
                      <p className="text-sm text-gray-700 mb-4 bg-orange-50 p-3 rounded">
                        Where are you right now? What does your self-review footage tell you?
                      </p>
                      <Textarea
                        placeholder="What is your current reality?"
                        value={growState.reality}
                        onChange={(e) => setGrowState((prev) => ({ ...prev, reality: e.target.value }))}
                        className="h-32 text-sm"
                      />
                    </div>
                  )}

                  {/* Step 4: Options & Will */}
                  {growState.currentStep === 4 && (
                    <div className="space-y-6">
                      <StepIndicator letter="O" label="OPTIONS" isActive={true} isComplete={growState.reality.length > 0} />
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">OPTIONS</h2>
                      <p className="text-sm text-gray-700 mb-4 bg-green-50 p-3 rounded">
                        What could you try? What does the Masterclass show you?
                      </p>
                      <Textarea
                        placeholder="What options are available?"
                        value={growState.options}
                        onChange={(e) => setGrowState((prev) => ({ ...prev, options: e.target.value }))}
                        className="h-32 text-sm mb-6"
                      />

                      <Separator />

                      <StepIndicator letter="W" label="WILL" isActive={true} isComplete={growState.options.length > 0} />
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">WILL</h2>
                      <p className="text-sm text-gray-700 mb-4 bg-purple-50 p-3 rounded">
                        Which option will you commit to? What specifically will you do?
                      </p>
                      <Textarea
                        placeholder="What will you do?"
                        value={growState.will}
                        onChange={(e) => setGrowState((prev) => ({ ...prev, will: e.target.value }))}
                        className="h-32 text-sm"
                      />
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Navigation */}
                  <div className="flex gap-3 justify-between">
                    <Button
                      variant="outline"
                      onClick={handleGROWPrev}
                      disabled={growState.currentStep === 1}
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-gray-600">
                      Step {growState.currentStep} of 4
                    </div>
                    <Button
                      onClick={handleGROWNext}
                      disabled={growState.currentStep === 4 || !growCanProceed}
                      className="bg-lm-dark hover:bg-lm-dark/90 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </Card>
              </div>

              {/* GROW Preview */}
              <div>
                <div className="sticky top-8">
                  <Card className="p-6 bg-white border-2 border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm">Conversation Guide</h3>

                    {growInstructor && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-600">With</p>
                        <p className="font-semibold text-sm">{growInstructor.name}</p>
                      </div>
                    )}

                    <Separator className="my-4" />

                    <div className="space-y-4 text-xs">
                      {growState.goal && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">GOAL</p>
                          <p className="text-gray-700 line-clamp-2">{growState.goal}</p>
                        </div>
                      )}
                      {growState.reality && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">REALITY</p>
                          <p className="text-gray-700 line-clamp-2">{growState.reality}</p>
                        </div>
                      )}
                      {growState.options && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">OPTIONS</p>
                          <p className="text-gray-700 line-clamp-2">{growState.options}</p>
                        </div>
                      )}
                      {growState.will && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">WILL</p>
                          <p className="text-gray-700 line-clamp-2">{growState.will}</p>
                        </div>
                      )}
                    </div>

                    {growState.currentStep === 4 && growState.goal && growState.reality && growState.options && growState.will && (
                      <>
                        <Separator className="my-4" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopyGROW}
                          className="w-full gap-2 text-xs"
                        >
                          <Copy className="w-3 h-3" />
                          Copy Guide
                        </Button>
                      </>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
